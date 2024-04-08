export function request(ctx) {
    return {
      method: 'POST',
      resourcePath: '/',
      params: {
        body: {
          Image: {
            S3Object: {
              Bucket: ctx.arguments.bucket,
              Name: ctx.arguments.path
            }
          }
        },
        headers: {
          'Content-Type': 'application/x-amz-json-1.1',
          'X-Amz-Target': 'RekognitionService.DetectLabels'
        }
      },
    }
  }
  
  export function response(ctx) {
    return JSON.parse(ctx.result.body)
      .Labels
      .map(label => label.Name)
      .join(',')
      .trim()
  }