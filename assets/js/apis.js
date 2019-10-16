const HB_URL = "https://intranet.hbtn.io";

export const correctionRequest = (taskId, authToken) => ({
  async: true,
  crossDomain: true,
  url: `${HB_URL}/tasks/${taskId}/start_correction.json?auth_token=${authToken}`,
  method: "POST",
  statusCode: {
    429: () => {
      alert("Exceeded request limit! Please try again in an hour.");
    }
  }
});

export const authenticationRequest = json => ({
  async: true,
  crossDomain: true,
  url: `${HB_URL}/users/auth_token.json`,
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  data: JSON.stringify(json)
});

export const resultRequest = (dataId, authToken) => ({
  async: true,
  crossDomain: true,
  url: `${HB_URL}/correction_requests/${dataId}.json?auth_token=${authToken}`,
  method: "GET"
});

export const projectRequest = (projectId, authToken) => ({
  async: true,
  crossDomain: true,
  url: `${HB_URL}/projects/${projectId}.json?auth_token=${authToken}`,
  method: "GET"
});
