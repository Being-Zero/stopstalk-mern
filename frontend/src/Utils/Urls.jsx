// always use DEV BASE URL WHILE TESTING AND DON'T FORGET TO CHANGE IT TO PROD WHILE PUSHING

export const BASE_URL_DEV = "http://localhost:4000/";
export const BASE_URL_PROD = "https://stopstalk-mern.herokuapp.com/";

export const LOGIN_URL = `${BASE_URL_PROD}api/v1/users/login`;
export const REGISTER_URL = `${BASE_URL_PROD}api/v1/users/signup`;
export const GOOGLE_LOGIN = `${BASE_URL_PROD}api/v1/users/verify-google-login`;
export const USER_DATA = `${BASE_URL_PROD}api/v1/users/getme`;
export const UPDATE_USER_DATA_URL = `${BASE_URL_PROD}api/v1/users/updateme`;
export const GET_HANDELS = `${BASE_URL_PROD}api/v1/users/gethandles`;
export const GET_GLOBAL_SUBMISSIONS = `${BASE_URL_PROD}api/v1/problem/get-global-trending`;
export const GET_FRIENDS_SUBMISSIONS = `${BASE_URL_PROD}api/v1/problem/get-friends-trending`;
export const GET_FILTERS = `${BASE_URL_PROD}api/v1/problem/filter`;
export const GET_PROBLEMS = `${BASE_URL_PROD}api/v1/problem/`;
export const GET_PROBLEM_BY_ID = `${BASE_URL_PROD}api/v1/codeEditor/`;
export const SUBMIT_PROBLEM_BY_ID = `${BASE_URL_PROD}api/v1/codeEditor/submit`;

export const CLIENT_ID =
  "692453991340-msotqakd0ukcnqb2kdqb3fn1bltvmuet.apps.googleusercontent.com";
export const API_KEY = "AIzaSyAALicvUVnZgxvRhf2fx3M9xtl76oyTmx4";
export const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
export const SCOPES = "https://www.googleapis.com/auth/calendar.events";
