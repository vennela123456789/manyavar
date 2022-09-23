import { environment } from "src/environments/environment"
const apiUrl = environment.apiUrl;

export const ContactUs = apiUrl + '/api/InsertEnquiry'
export const finalApi = apiUrl + '/api/InsertFranchisee'
export const franchise = apiUrl + '/getapi/GetAllCountryCodes'
export const stateApi = apiUrl + '/api/GetAllStates?CountryId='
export const cityApi = apiUrl + '/api/GetAllCitiesByStateName'