export const actions = {
  REQUEST_JSON: 'REQUEST_JSON'
}

export function requestJson(url) {
  return {
    type: actions.REQUEST_JSON,
    url: url
  }
}