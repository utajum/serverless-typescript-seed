type jsonApiErrorItem = {
  status: number
  source?: string
  title: string
  description: string
}

export function success(data: any) {
  return {
    ...buildResponse(200),
    ...{ body: JSON.stringify({ data }) },
  }
}

export function failure(errors: jsonApiErrorItem[], code?: number) {
  let statusCode = 500
  if (code) {
    statusCode = code
  }
  return {
    ...buildResponse(statusCode),
    ...{ body: JSON.stringify({ errors }) },
  }
}

function buildResponse(statusCode: number) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  }
}
