function call(method, url, headers, body, callback) {

  if(!headers) {
    headers = {}
    if (body) headers['Content-Type'] = 'application/json;charset=UTF-8'
  }

  fetch(method, url, headers, body, response => {
    if (response.readyState == 4) { // && response.status == 201 to make all responses correct
      const result = JSON.parse(response.responseText)

      callback(result)
    }
  })
}
