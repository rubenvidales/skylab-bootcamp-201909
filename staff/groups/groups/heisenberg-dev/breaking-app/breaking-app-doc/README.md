# Breaking App

![Breaking App](img/breaking-logo.png)

## Intro

Breaking App is an application designed for the lovers of the Breaking Bad TV series. In this app, the users can watch the list of characters and episodes, alongside other information like birthdates of the characters, their ocupation, name of the actor that plays the role, etc. Users can also register and select their favourite episodes and characters.

*Breaking App es una aplicación diseñada para los amantes de la serie de TV Breaking Bad. En ella, los usuarios podrán consultar la lista de personajes y episodios de la serie, junto con otras informaciones como la fecha de nacimiento del personaje, su ocupación, nombre del actor que lo interpreta, etc. Los usuarios también podrán registrarse y seleccionar sus episodios y personajes favoritos.*

### Authors

+ Isidro
+ Joan
+ Rubén

## Functional Description

### Use Cases

![Use Cases](img/use-cases.png)

### Activity Diagram

![Activity Diagram](img/activity.png)

### Class Diagram

![Class Diagram](img/class.png)

## Technical Description

### Blocks

![Blocks](img/blocks.png)

### Components

![Components](img/components.png)

### Data Model

![Data Model](img/data-model.png)

### Code Coverage

Jasmine Screenshot

### Built with

+ JavaScript with React
+ HTML
+ CSS with Sass
+ Tests made with Jasmine

## Errors and Bugs

The 'season' property of the object of the last episode of the first season it's not correctly expressed, because has a space at the beginning of the string, which differs with the rest of the arrays. For this reason, we have to use the method 'trim' for make that the episode does the appearance.

The list of characters it's not the same when you click on the list of characters that when you do search. That makes that the information it's not presented on the same way. For example, the occupation mark when you click on the character list.

The IDs of the episodes and characters are presented only in numbers, which causes problems when you try to concatenate, for example, with the URLs. We have forced to use the method 'toString' for the numbers be identificated as strings and make the correct concatenations.

## Thank you

+ to Jorge, Jose and Manu for their continous support.
+ to Martín and his group for the use of their API to fill the gaps of the information that don't appear in our API and the tips for its use.

