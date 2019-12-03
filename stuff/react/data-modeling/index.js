// DEMO quiz with questions

// modeling

class Quiz {
	constructor(title, description) { this.title = title, this.description = description }

	addQuestion(question) {
		if (!this.questions) this.questions = []
		this.questions.push(question)
    }
}

class Question {
	constructor(text, score) { this.text = text, this.score = score }
}


// using

const quiz = new Quiz('hola mundo', 'blah blah blah')

const question1 = new Question('...? 1', 100)
const question2 = new Question('...? 2', 200)

quiz.addQuestion(question1)
quiz.addQuestion(question2)

const json = JSON.stringify(quiz, null, 4)

console.log(json)

// {
//     "title": "hola mundo",
//     "description": "blah blah blah",
//     "questions": [
//         {
//             "text": "...? 1",
//             "score": 100
//         },
//         {
//             "text": "...? 2",
//             "score": 200
//         }
//     ]
// }