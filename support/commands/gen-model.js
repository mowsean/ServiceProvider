const loadConfig = require("../../server/boot/loadConfig");
const path = require("path");
const fs = require("fs");
const util = require("util");
const handlebars = require("handlebars");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const TEMPLATE_FILE_PATH = path.join(__dirname, "./model-template.txt");

const adaptLength = len => (len > 0 ? `(${len})` : "");
const adaptVarchar = c => `STRING${adaptLength(c.CHARACTER_MAXIMUM_LENGTH)}`;
const adaptNvarchar = c => `STRING${adaptLength(c.CHARACTER_OCTET_LENGTH)}`;
const adaptPrecision = c => {
  let result = c.NUMERIC_PRECISION.toString();

  if (c.NUMERIC_SCALE !== null) {
    result += "," + c.NUMERIC_SCALE.toString();
  }

  return result;
};
const adaptDecimal = c => `DECIMAL(${adaptPrecision(c)})`;

const TYPE_MAP = new Map();

TYPE_MAP.set("bigint", c => "BIGINT");
TYPE_MAP.set("bit", c => "BOOLEAN");
TYPE_MAP.set("decimal", adaptDecimal);
TYPE_MAP.set("int", c => "INTEGER");
TYPE_MAP.set("money", adaptDecimal);
TYPE_MAP.set("numeric", adaptDecimal);
TYPE_MAP.set("smallint", c => "INTEGER");
TYPE_MAP.set("smallmoney", adaptDecimal);
TYPE_MAP.set("tinyint", c => "INTEGER");
TYPE_MAP.set("float", adaptDecimal);
TYPE_MAP.set("real", adaptDecimal);
TYPE_MAP.set("date", c => "DATE");
TYPE_MAP.set("datetime", c => "DATE");
TYPE_MAP.set("datetime2", c => "DATE");
TYPE_MAP.set("smalldatetime", c => "SMALLDATETIME");
TYPE_MAP.set("char", c => "CHAR");
TYPE_MAP.set("nchar", c => "CHAR");
TYPE_MAP.set("varchar", adaptVarchar);
TYPE_MAP.set("nvarchar", adaptNvarchar);
TYPE_MAP.set("text", c => "TEXT");
TYPE_MAP.set("ntext", c => "TEXT");
TYPE_MAP.set("uniqueidentifier", c => "UUIDV4");
TYPE_MAP.set("binary", c => "BLOB");
TYPE_MAP.set("varbinary", c => "BLOB");
TYPE_MAP.set("image", c => "BLOB");
TYPE_MAP.set("time", c => "TIME");
TYPE_MAP.set("xml", c => "STRING");
TYPE_MAP.set("datetimeoffset", c => "DATE");

const mapType = col => {
  const dataType = col.DATA_TYPE.toLowerCase();
  if (TYPE_MAP.has(dataType)) {
    const typeFactory = TYPE_MAP.get(dataType);
    return typeFactory(col);
  }
};

const mapNull = nullableText => nullableText === "YES";

const mapDefault = value => null;

const mapPrimarykey = col => {
  return !!col.PrimaryKeyColumn;
};

module.exports = {
  command: "gen-model",
  description: "Generates a sequelize model for a table.",
  builder: {
    db: {
      demand: true,
      description: "key for the database in the config YAML file"
    },
    catalog: {
      demand: true,
      description: "database catalog table can be found in"
    },
    schema: {
      default: "dbo",
      demand: true,
      description: "database schema table can be found in"
    },
    env: {
      default: "development",
      demand: true,
      description: "environment key for which config YAML to use"
    },
    table: {
      demand: true,
      description: "name of the SQL table"
    },
    out: {
      description: "output directory for the generated model"
    }
  },
  handler: argv => {
    const graft = (ctx, key) => value =>
      Object.assign({}, ctx, {
        [key]: value
      });

    const mapSequelize = config => ({
      sequelize: config.databases[argv.db]
    });

    const loadTemplate = ctx =>
      readFile(TEMPLATE_FILE_PATH, "utf8").then(graft(ctx, "template"));

    const compileTemplate = ctx => {
      const compiledTemplate = handlebars.compile(ctx.template);
      return Object.assign({}, ctx, {
        compiledTemplate
      });
    };

    const querySchema = ctx => {
      const options = {
        replacements: {
          table: argv.table,
          schema: argv.schema,
          catalog: argv.catalog
        },
        type: ctx.sequelize.QueryTypes.SELECT
      };

      const query = `
        select
          kcu.column_name as PrimaryKeyColumn,
          c.*
        from
          information_schema.columns c
          left join information_schema.key_column_usage kcu
            on c.table_catalog = kcu.table_catalog
            and c.table_schema = kcu.table_schema
            and c.table_name = kcu.table_name
            and c.column_name = kcu.column_name
          left join information_schema.table_constraints tc
            on kcu.constraint_name = tc.constraint_name
            and tc.constraint_type = 'PRIMARY KEY'
        where
          c.table_name = :table
          and c.table_schema = :schema
          and c.table_catalog = :catalog`;

      return ctx.sequelize.query(query, options).then(graft(ctx, "records"));
    };

    const adaptColumns = ctx => {
      const mapColumns = records =>
        records.map(record => {
          return {
            name: record.COLUMN_NAME.toLowerCase(),
            type: mapType(record),
            allowNull: mapNull(record.IS_NULLABLE),
            defaultValue: mapDefault(record.COLUMN_DEFAULT),
            primaryKey: mapPrimarykey(record)
          };
        });

      return Promise.resolve(ctx.records)
        .then(mapColumns)
        .then(graft(ctx, "columns"));
    };

    const renderModel = ctx => {
      const viewModel = {
        tableName: argv.table.toLowerCase(),
        modelName: argv.table.toLowerCase(),
        columns: ctx.columns
      };

      const modelText = ctx.compiledTemplate(viewModel);

      return Object.assign({}, ctx, {
        modelText
      });
    };

    const outputFile = ctx => {
      const outputPath = argv.out ? argv.out : process.cwd();
      const filename = path.join(outputPath, `${argv.table.toLowerCase()}.js`);
      return writeFile(filename, ctx.modelText, "utf8").then(() => ctx);
    };

    loadConfig(argv.env)
      .then(mapSequelize)
      .then(loadTemplate)
      .then(compileTemplate)
      .then(querySchema)
      .then(adaptColumns)
      .then(renderModel)
      .then(outputFile)
      .then(ctx => ctx.sequelize.close())
      .catch(console.error);
  }
};
