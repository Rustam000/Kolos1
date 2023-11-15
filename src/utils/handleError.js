import { PATHS } from "../common/constants";

export default async function handleError(action) {
  const statusCode = action.payload.response.status;
  if (statusCode === 404) {
    document.location.href = PATHS.notFound;
  } else {
    return action;
  }
}
