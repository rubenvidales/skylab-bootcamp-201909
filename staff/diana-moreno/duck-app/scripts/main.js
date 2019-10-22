const viewList = new View(document.getElementsByClassName('view__list')[0])
const viewSingle = new View(document.getElementsByClassName('view__single')[0])
const viewRegister = new View(document.getElementsByClassName('view__register')[0])
const viewLogin = new View(document.getElementsByClassName('view__login')[0])
const viewHeader = new View(document.getElementsByClassName('view__header')[0])
const viewRegisterSuccess = new View(document.getElementsByClassName('view__registerSuccess')[0])
const feedback = new Feedback(document.getElementsByClassName('view__feedback')[0])
const buttonRegister = document.getElementsByClassName('form__button--register')[1]
const buttonBackToLogin = document.getElementsByClassName('form__button--register-back')[0]
const buttonBackToLogin2 = document.getElementsByClassName('form__button--register-back')[1]
let errorMessageLogin = document.getElementsByClassName("form__confirmation")[1]
let errorMessageRegister = document.getElementsByClassName("form__confirmation")[0]


function switchToRegister() {
  viewLogin.hide()
  viewRegister.show()
  errorMessageLogin.innerHTML = ''
}
buttonRegister.addEventListener('click', switchToRegister)

function switchToLogin() {
  viewRegister.hide()
  viewRegisterSuccess.hide()
  viewLogin.show()
  errorMessageRegister.innerHTML = '';
}
buttonBackToLogin.addEventListener('click', switchToLogin)
buttonBackToLogin2.addEventListener('click', switchToLogin)


function initialRandomDucks() {
  searchDucks('', (error, ducks) => {
    if (error) {
      feedback.render(error.message)
      viewList.hide()
      feedback.show()
    } else {
      ducks = ducks.shuffle().splice(0, 8)
      results.render(ducks)
    }
  })
}

const register = new Register(document.getElementsByClassName('form')[1])
register.onSubmit = (name, surname, email, password) => {
  try {
    registerUser(name, surname, email, password, function(error) {
      if(error) {
      errorMessageRegister.innerHTML = error.message;
      } else {
        viewRegister.hide()
        feedback.hide()
        viewRegisterSuccess.show()
      }
    })
  } catch (error) {
    errorMessageRegister.innerHTML = error.message;
  }
}

const login = new Login(document.getElementsByClassName('form')[2])
login.onSubmit = (email, password) => {
  try {
    authenticateUser(email, password, function(error) {
      if (error) {
        errorMessageLogin.innerHTML = 'Username and/or password incorrect'
      } else {
        viewLogin.hide()
        viewHeader.show()
        viewList.show()
        initialRandomDucks()
      }
    })
  } catch(error) {
    errorMessageLogin.innerHTML = 'Username and/or password incorrect'
  }
}

const form = document.getElementsByClassName('form')[0]
const search = new Search(form)
search.onSubmit = query => {
  searchDucks(query, (error, ducks) => {
    if (error) {
      feedback.render(error.message)
      viewList.hide()
      feedback.show()
    } else {
      results.render(ducks)
      feedback.hide()
      results.show()
    }
  }) // NOTE it works thanks to the internal binding that takes place in Results constructor
}

const duckList = document.getElementsByClassName('duck__list')[0]
const results = new Results(duckList)
results.onItemRender = () => {
  const li = document.createElement('li')
  li.classList.add("duck")
  li.classList.add("duck--clicked")
  const item = new ResultItem(li)

  item.onClick = function(id) {
    retrieveDuck(id, function(error, duck) {
      if (error) {
        feedback.render(error.message)
        results.hide()
        feedback.show()
      } else {
        detail.render(duck)
        viewList.hide()
        viewSingle.show()
      }
    })
  }
  return item
}

const detail = new Detail(document.getElementsByClassName('duck--litle')[0])
detail.onBack = () => {
  viewList.show()
  viewSingle.hide()
}