import React, { useEffect, useMemo, useRef, useState } from 'react';
import OrderStepHeader from '@components/app/MarketerComponents/OrderComponents/OrderStepHeader';
import useToggle from '@hooks/useToggle';
import { UploadIconSVG } from '@components/common/Icons';
import Api from '@/api';
import { useMutation, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import UploadTarget from '@components/common/UploadTarget';
import Loading from '@components/app/Loading';
import { yupResolver } from '@hookform/resolvers/yup';
import { completeFloorplanFormValidation } from '@/schemas';
import { HelpUrls } from '@/constants';
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import CountryFlag from 'react-country-flag';
import PropTypes from 'prop-types'
import en from 'react-phone-number-input/locale/en'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const INITIAL_STATE = {
  Description: '',
  Keywords: '',
  Address_1: '',
  Address_2: '',
  City: '',
  State: '',
  Zip: '',
  First_Name: '',
  Last_Name: '',
  Title: '',
  Email: '',
  Phone: '',
  Website: '',
  Image: '',
  Facebook_Link: '',
  Instagram_Link: '',
  Twitter_Link: '',
  Linkedin_Link: '',
  Youtube_Link: '',
  Pinterest_Link: '',
};

const SECTION_FIELDS = {
  Description: 'mainProfile',
  Keywords: 'mainProfile',
  Image: 'mainProfile',
  Address_1: 'contactInfo',
  Address_2: 'contactInfo',
  City: 'contactInfo',
  State: 'contactInfo',
  Zip: 'contactInfo',
  First_Name: 'contactInfo',
  Last_Name: 'contactInfo',
  Title: 'contactInfo',
  Email: 'contactInfo',
  Phone: 'contactInfo',
  Website: 'links',
  Facebook_Link: 'links',
  Instagram_Link: 'links',
  Twitter_Link: 'links',
  Linkedin_Link: 'links',
  Youtube_Link: 'links',
  Pinterest_Link: 'links',
};

const retrieveOnlyFormData = function (formData, originalData) {
  return Object.keys(formData).reduce((accumulator, key) => {
    accumulator[key] = originalData[key];
    return accumulator;
  }, {});
};

export default function CompleteFloorPlanPPStep({
  stepNumber,
  status,
  isOrderApproved,
  isInvalidOrder,
  mapDynamicsApiKey,
  mapDynamicsSecret,
  profileName,
  phoneCountryCode,
  companyName,
  orderId,
  eventId,
}) {
  const [isCollapsed, toggleCollapsed] = useToggle(isInvalidOrder || !isOrderApproved);
  const [isFloorPlanComplete, setFloorPlanComplete] = useState(false);
  const [buttonToggler, setButtonToggler] = useState('mainProfile');
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
    watch,
  } = useForm({
    defaultValues: INITIAL_STATE,
    resolver: yupResolver(completeFloorplanFormValidation),
  });
  const floorplanImage = watch('Image');

  const { mapDynamics: MDApi } = new Api();

  const displayOrderId = useMemo(() => orderId.slice(-6).toUpperCase(), [orderId]);
  const profile = useMemo(() => `${profileName} / ${displayOrderId}`, [profileName, orderId]);
  const company = useMemo(() => `${companyName} / ${displayOrderId}`, [companyName, orderId]);
  const [phoneNo, setPhoneNo] = useState();

  const {
    isLoading,
    data: floorplanData,
    refetch: MDExhibitorSelect,
  } = useQuery(
    ['md_api:floorplan_data', { company, profile }],
    () => MDApi.exhibitorsSelect(mapDynamicsApiKey, mapDynamicsSecret, profile, company),
    {
      retry: 2,
      refetchOnWindowFocus: false,
      enabled: mapDynamicsApiKey !== null && mapDynamicsSecret !== null,
    },
  );

  const { mutate: MDExhibitorUpdate, isLoading: isUpdating } = useMutation(
    data => MDApi.updateFloorplanInformation(mapDynamicsApiKey, mapDynamicsSecret, data),
    { onSuccess: () => MDExhibitorSelect() },
  );

  useEffect(() => {
    if (floorplanData?.ID) {
      if (floorplanData.Phone != '') {
        var phoneNumber = new parsePhoneNumber(floorplanData.Phone, phoneCountryCode);
        setPhoneNo(phoneNumber.formatInternational());
        setSelectedCountry(phoneNumber.country);
      }

      let objectKeys = Object.keys(floorplanData);
      let objectValues = Object.values(floorplanData);
      let sections = { mainProfile: false, links: false, contactInfo: false };
      for (let i = 0; i < objectKeys.length; i++) {
        let key = objectKeys[i];
        let value = objectValues[i];
        let section = SECTION_FIELDS[key];
        if (!sections[section] && !isFloorPlanComplete && value !== '') {
          sections[section] = true;
        }
        setValue(key, value, { shouldValidate: false, shouldDirty: false, shouldTouch: false });
      }
      if (sections.mainProfile && sections.links && sections.contactInfo) {
        setFloorPlanComplete(true);
        toggleCollapsed(true);
      }
    }
  }, [floorplanData]);

  const onSubmit = async formData => {
    const oldPhoneNumber = new parsePhoneNumber(phoneNo);
    const newPhoneNumber = new parsePhoneNumber(oldPhoneNumber?.nationalNumber, selectedCountry);
    if (newPhoneNumber?.number && isValidPhoneNumber(newPhoneNumber?.number)) {
      formData.Phone = newPhoneNumber.number;
    }

    if (!phoneNo) {
      formData.Phone = ' ';
    }

    if (JSON.stringify(formData) === JSON.stringify(retrieveOnlyFormData(formData, floorplanData))) {
      return;
    }

    let newCompanyName = MDApi.cleanExhibitorName(formData.Company);
    MDExhibitorUpdate({
      exhibitor_id: floorplanData.ID,
      company: `${newCompanyName} / ${displayOrderId}`,
      // space_number = order.space_number_assigned
      ...formData,
    });
    reset(formData, { keepValues: true });
  };

  const handleInputBlur = fromBtnClick => {
    if (fromBtnClick === true) {
      if (errors && Object.keys(errors).length) {
        setButtonToggler(SECTION_FIELDS[Object.keys(errors)[0]]);
        const errorsvalues = Object.values(errors);
        if (errorsvalues.length > 0) {
          if (errorsvalues[0] && errorsvalues[0].ref !== undefined) {
            let firstErrorElement = document.getElementsByName(errorsvalues[0].ref.name)[0];
            firstErrorElement?.scrollIntoView({ behavior: `smooth`, block: 'center' });
          }
        }
      }
    }
    handleSubmit(onSubmit)();
  };

  function handleUploadDocument(_, url, __) {
    setValue('Image', url);
    handleSubmit(onSubmit)();
  }

  const handlePhoneChange = (phoneNum) => {
    setPhoneNo(phoneNum);
  }

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('us');

  const toggleDropdown = () => {
    setIsCountryOpen(!isCountryOpen);
  };


  const onChangeCountry = (e) => {
    const { value } = e.currentTarget.attributes.country;
    const oldPhoneNumber = new parsePhoneNumber(phoneNo);
    const newPhoneNumber = new parsePhoneNumber(oldPhoneNumber.nationalNumber, value);
    setPhoneNo(newPhoneNumber?.number);
    setSelectedCountry(value);
    setIsCountryOpen(false);
  }

  const getCountryFlag = (code) => {
    return (<CountryFlag
      countryCode={code}
      svg
      styleProps={{ width: '100px', height: '70px' }}
    />)
  }

  const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <>
      <div className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          type="button"
          className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300 inline-flex justify-center w-46 px-4 py-2 text-sm font-medium text-gray-700 "
        >
          {getCountryFlag(selectedCountry)}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isCountryOpen && (
        <div className='flex absolute mb-72' >
          <ul className="absolute1 z-10 h-48 w-80 origin-top-right overflow-auto  scroll-smooth bg-white border border-gray-300 shadow-lg">
            {getCountries().map((country) => (
              <li key={country} country={country} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer" onClick={onChangeCountry}>
                {getCountryFlag(country)} {labels[country]} +{getCountryCallingCode(country)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )

  CountrySelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    labels: PropTypes.objectOf(PropTypes.string).isRequired
  }

  const [country, setCountry] = useState()

  const renderFlagDropdown = (props) => (
    <CountrySelect
      labels={en}
      value={country}
      onChange={setCountry} />
  );

  return (
    <div className="relative bg-white border rounded border-gray-200 w-full stepContainer my-5">
      <OrderStepHeader
        stepNumber={stepNumber}
        title="Complete Floor plan public profile"
        description="Edit/view public profile on floor plan"
        handleToggle={toggleCollapsed}
        status={isFloorPlanComplete}
        isCollapsed={isCollapsed}
        helpMessage="Public Profile Tutorial"
        helpUrl={HelpUrls.floorplan}
        isInvalidOrder={isInvalidOrder}
        isOrderApproved={isOrderApproved}
        needsOrderApproval={true}
      />
      {!isCollapsed && (
        <div className="relative overflow-hidden">
          {(isLoading || isUpdating) && (
            <div className="absolute inset-0 flex justify-center items-center bg-white/60">
              <Loading />
            </div>
          )}
          <div className="flex pt-2 lg:px-10">
            <button
              className={classNames(
                'font-bold text-sm text-hub-cyan border border-b-0 border-hub-cyan rounded-t p-5 lg:p-7 px-10 w-full',
                buttonToggler !== 'mainProfile' && 'border-none bg-gray-200 text-black',
              )}
              onClick={() => setButtonToggler('mainProfile')}
            >
              Main Profile
            </button>
            <button
              className={classNames(
                'font-bold text-sm text-hub-cyan border border-b-0 border-hub-cyan rounded-t p-5 lg:p-7 px-10 w-full',
                buttonToggler !== 'contactInfo' && 'border-none bg-gray-200 text-black',
              )}
              onClick={() => setButtonToggler('contactInfo')}
            >
              Contact Information
            </button>
            <button
              className={classNames(
                'font-bold text-sm text-hub-cyan border border-b-0 border-hub-cyan rounded-t p-5 lg:p-7 px-10 w-full',
                buttonToggler !== 'links' && 'border-none bg-gray-200 text-black',
              )}
              onClick={() => setButtonToggler('links')}
            >
              Links
            </button>
          </div>
          {buttonToggler === 'mainProfile' ? (
            <div className="pt-2 p-2 lg:px-10">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="Description"
                rows="4"
                name="Description"
                {...register('Description', { onBlur: handleInputBlur })}
                className="block p-2.5 w-full text-sm text-gray-700 bg-white rounded border border-gray-300"
              />
              {errors.Description && (
                <p className="mt-1 text-sm text-red-700" id="Description-error">
                  {errors.Description.message}
                </p>
              )}
              <label htmlFor="keywords" className="block mb-2 text-sm font-medium text-gray-700">
                Keywords
              </label>
              <textarea
                id="Keywords"
                rows="4"
                name="Keywords"
                {...register('Keywords', { onBlur: handleInputBlur })}
                className="block p-2.5 w-full text-sm text-gray-700 bg-white rounded border border-gray-300"
              />
              {errors.Keywords && (
                <p className="mt-1 text-sm text-red-700" id="Keywords-error">
                  {errors.Keywords.message}
                </p>
              )}
              <div className="text-sm mt-3">
                <p className="font-bold">Upload Booth or Product Images or Sketches (Optional)</p>
                <p className="font-normal">File Types Accepted: jpeg, jpg, png</p>
                <p className="font-normal">Max File Size: 10MB</p>
              </div>
              <div className="w-full">
                <div className="flex flex-col justify-ce nter my-5 w-full lg:w-2/5 md:w-2/5 px-2 lg:px-0">
                  <UploadTarget
                    folder={`events/${eventId}/orders/${orderId}/floorplan/`}
                    image={floorplanImage}
                    imageClasses="h-full w-auto mx-auto border border-hub-blueGray rounded-lg mb-2"
                    buttonMode={true}
                    buttonClasses={`btn-hub primary w-full justify-center`}
                    isUploadingText={'Uploading...'}
                    acceptedFileTypes="image/png, image/jpeg, image/jpg"
                    buttonText={
                      <>
                        <UploadIconSVG classes="mr-2 h-4 my-auto" title="Upload Document" />
                        Upload Image
                      </>
                    }
                    onChange={handleUploadDocument}
                  />
                </div>
              </div>
            </div>
          ) : buttonToggler === 'contactInfo' ? (
            <div className="pt-2 p-2 lg:px-10">
              <p className="text-hub-lightBlue uppercase font-medium text-sm ml-5">BASIC CONTACT INFO (PUBLIC)</p>
              <div className="space-y-4 divide-y divide-gray-200">
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 border-none">
                  <div className="col-span-1">
                    <label htmlFor="Address_1" className="block text-sm font-medium text-gray-700">
                      Address 1
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Address_1', { onBlur: handleInputBlur })}
                        name="Address_1"
                        id="Address_1"
                        autoComplete="Address_1"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Address_1 && (
                        <p className="mt-1 text-sm text-red-700" id="Address_1-error">
                          {errors.Address_1.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="Address_2" className="block text-sm font-medium text-gray-700">
                      Address 2
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Address_2', { onBlur: handleInputBlur })}
                        name="Address_2"
                        id="Address_2"
                        autoComplete="Address_2"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Address_2 && (
                        <p className="mt-1 text-sm text-red-700" id="Address_2-error">
                          {errors.Address_2.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 border-none">
                  <div className="col-span-1">
                    <label htmlFor="City" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('City', { onBlur: handleInputBlur })}
                        name="City"
                        id="City"
                        autoComplete="City"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.City && (
                        <p className="mt-1 text-sm text-red-700" id="City-error">
                          {errors.City.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="State" className="block text-sm font-medium text-gray-700">
                      State/Province
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('State', { onBlur: handleInputBlur })}
                        name="State"
                        id="State"
                        autoComplete="State"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.State && (
                        <p className="mt-1 text-sm text-red-700" id="State-error">
                          {errors.State.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 border-none">
                  <div className="col-span-1">
                    <label htmlFor="Zip" className="block text-sm font-medium text-gray-700">
                      Postal/Zip Code
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Zip', { onBlur: handleInputBlur, required: true })}
                        name="Zip"
                        id="Zip"
                        autoComplete="Zip"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Zip && (
                        <p className="mt-1 text-sm text-red-700" id="Zip-error">
                          {errors.Zip.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 border-none">
                  <div className="col-span-1">
                    <label htmlFor="First_Name" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('First_Name', {
                          onBlur: handleInputBlur,
                          onClick: e => e.currentTarget.focus(),
                        })}
                        name="First_Name"
                        id="First_Name"
                        autoComplete="First_Name"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.First_Name && (
                        <p className="mt-1 text-sm text-red-700" id="First_Name-error">
                          {errors.First_Name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="Last_Name" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Last_Name', { onBlur: handleInputBlur })}
                        name="Last_Name"
                        id="Last_Name"
                        autoComplete="Last_Name"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Last_Name && (
                        <p className="mt-1 text-sm text-red-700" id="Last_Name-error">
                          {errors.Last_Name.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 border-none">
                  <div className="col-span-1">
                    <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Title', { onBlur: handleInputBlur })}
                        name="Title"
                        id="Title"
                        autoComplete="Title"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Title && (
                        <p className="mt-1 text-sm text-red-700" id="Title-error">
                          {errors.Title.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 border-none">
                  <div className="col-span-1">
                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Email', { onBlur: handleInputBlur })}
                        name="Email"
                        id="Email"
                        autoComplete="Email"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Email && (
                        <p className="mt-1 text-sm text-red-700" id="Email-error">
                          {errors.Email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <div className="rounded border">
                        <PhoneInput
                          countrySelectComponent={renderFlagDropdown}
                          initialValueFormat='national'
                          onBlur={handleInputBlur}
                          value={phoneNo}
                          className="flex-1 block w-full min-w-0 rounded sm:text-sm border-white-300 bg-white white"
                          onChange={handlePhoneChange}
                          placeholder="(201) 555 - 0123"
                        />
                      </div>
                      {phoneNo ? (isValidPhoneNumber(phoneNo) ? undefined : <small className="text-red-700">{`Invalid phone number`}</small>) : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : buttonToggler === 'links' ? (
            <div className="pt-2 p-2 lg:px-10">
              <p className="text-hub-lightBlue uppercase font-medium text-sm ml-5">WEBSITE AND SOCIAL MEDIA LINKS</p>
              <div className="space-y-4 divide-y divide-gray-200">
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 border-none">
                  <div className="col-span-1">
                    <label htmlFor="Website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Website', { onBlur: handleInputBlur })}
                        name="Website"
                        id="Website"
                        autoComplete="Website"
                        placeholder="https://"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Website && (
                        <p className="mt-1 text-sm text-red-700" id="Website-error">
                          {errors.Website.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="Facebook_Link" className="block text-sm font-medium text-gray-700">
                      Facebook
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Facebook_Link', {
                          onBlur: handleInputBlur,
                          onClick: e => e.currentTarget.focus(),
                        })}
                        name="Facebook_Link"
                        id="Facebook_Link"
                        autoComplete="Facebook_Link"
                        placeholder="https://"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Facebook_Link && (
                        <p className="mt-1 text-sm text-red-700" id="Facebook_Link-error">
                          {errors.Facebook_Link.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 border-none">
                  <div className="col-span-1">
                    <label htmlFor="Instagram_Link" className="block text-sm font-medium text-gray-700">
                      Instagram
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Instagram_Link', {
                          onBlur: handleInputBlur,
                          onClick: e => e.currentTarget.focus(),
                        })}
                        name="Instagram_Link"
                        id="Instagram_Link"
                        autoComplete="Instagram_Link"
                        placeholder="https://"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Instagram_Link && (
                        <p className="mt-1 text-sm text-red-700" id="Instagram_Link-error">
                          {errors.Instagram_Link.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="Twitter_Link" className="block text-sm font-medium text-gray-700">
                      Twitter
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Twitter_Link', {
                          onBlur: handleInputBlur,
                          onClick: e => e.currentTarget.focus(),
                        })}
                        name="Twitter_Link"
                        id="Twitter_Link"
                        autoComplete="Twitter_Link"
                        placeholder="https://"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Twitter_Link && (
                        <p className="mt-1 text-sm text-red-700" id="Twitter_Link-error">
                          {errors.Twitter_Link.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 border-none">
                  <div className="col-span-1">
                    <label htmlFor="Linkedin_Link" className="block text-sm font-medium text-gray-700">
                      LinkedIn
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Linkedin_Link', {
                          onBlur: handleInputBlur,
                          onClick: e => e.currentTarget.focus(),
                        })}
                        name="Linkedin_Link"
                        id="Linkedin_Link"
                        autoComplete="Linkedin_Link"
                        placeholder="https://"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Linkedin_Link && (
                        <p className="mt-1 text-sm text-red-700" id="Linkedin_Link-error">
                          {errors.Linkedin_Link.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="Youtube_Link" className="block text-sm font-medium text-gray-700">
                      Youtube
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Youtube_Link', {
                          onBlur: handleInputBlur,
                          onClick: e => e.currentTarget.focus(),
                        })}
                        name="Youtube_Link"
                        id="Youtube_Link"
                        autoComplete="Youtube_Link"
                        placeholder="https://"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Youtube_Link && (
                        <p className="mt-1 text-sm text-red-700" id="Youtube_Link-error">
                          {errors.Youtube_Link.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-4 border-none">
                  <div className="col-span-1">
                    <label htmlFor="Pinterest_Link" className="block text-sm font-medium text-gray-700">
                      Pinterest
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('Pinterest_Link', {
                          onBlur: handleInputBlur,
                          onClick: e => e.currentTarget.focus(),
                        })}
                        name="Pinterest_Link"
                        id="Pinterest_Link"
                        autoComplete="Pinterest_Link"
                        placeholder="https://"
                        className="flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300"
                      />
                      {errors.Pinterest_Link && (
                        <p className="mt-1 text-sm text-red-700" id="Pinterest_Link-error">
                          {errors.Pinterest_Link.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
      {isDirty && (
        <div className="sticky bottom-[7.45rem] rounded-sm mb-2 md:hidden lg:hidden">
          <div className="w-full">
            <button className="btn-hub primary w-full justify-center" onClick={() => handleInputBlur(true)}>
              Save Floor Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
