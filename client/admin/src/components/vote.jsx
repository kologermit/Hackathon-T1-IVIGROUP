var vote1 = [
    {id: 14, name: "Голосование номер один", variants: {'Свойство 1': [5, 7, 4, 2, 6], 'Свойство 2': [3, 2, 9, 3, 6], 'Свойство 3': [1, 2, 6, 7, 4]}, 
    percentage: {'Свойство 1': [0, 0, 0, 0, 0], 'Свойство 2': [0, 0, 0, 0, 0], 'Свойство 3': [0, 0, 0, 0, 0]}, 
    biggestIndex: {'Свойство 1': 0, 'Свойство 2': 0, 'Свойство 3': 0}},
    {id: 15, name: "Голосование номер два", variants: {'Свойство 1': [5, 7, 4, 2, 6], 'Свойство 2': [3, 2, 9, 3, 6], 'Свойство 3': [1, 2, 6, 7, 4]}, 
    percentage: {'Свойство 1': [0, 0, 0, 0, 0], 'Свойство 2': [0, 0, 0, 0, 0], 'Свойство 3': [0, 0, 0, 0, 0]},
    biggestIndex: {'Свойство 1': 0, 'Свойство 2': 0, 'Свойство 3': 0}},
    {id: 16, name: "Голосование номер три", variants: {'Свойство 1': [5, 7, 4, 2, 6], 'Свойство 2': [3, 2, 9, 3, 6], 'Свойство 3': [1, 2, 6, 7, 4]}, 
    percentage: {'Свойство 1': [0, 0, 0, 0, 0], 'Свойство 2': [0, 0, 0, 0, 0], 'Свойство 3': [0, 0, 0, 0, 0]},
    biggestIndex: {'Свойство 1': 0, 'Свойство 2': 0, 'Свойство 3': 0}}
]

var vote = [{}]

var categories = {
    0: "Обязательные",
    1: "Важные",
    2: "Интересные",
    3: "Безразличные",
    4: "Сомнительные"
}

var view = new Map();

var questions = [['', '']]

var user = new Map();

var poll = []

module.exports = { vote, vote1, questions, categories, view, user, poll }; 