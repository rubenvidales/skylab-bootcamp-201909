if (!Error.captureStackTrace) {
    Error.captureStackTrace = function captureStackTrace (error) {
      var container = new Error()
  
      Object.defineProperty(error, 'stack', {
        configurable: true,
        get: function getStack () {
          var stack = container.stack
  
          // Replace property with value for faster future accesses.
          Object.defineProperty(this, 'stack', {
            configurable: true,
            value: stack,
            writable: true
          })
  
          return stack
        },
        set: function setStack (stack) {
          Object.defineProperty(error, 'stack', {
            configurable: true,
            value: stack,
            writable: true
          })
        }
      })
    }
  }