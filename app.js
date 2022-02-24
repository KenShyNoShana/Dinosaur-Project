
    // Create Dino Constructor
    class Dino
    {
        constructor(species, weight, height, diet, where, when, fact)
        {
            this.species = species;
            this.weight = weight;
            this.height = height;
            this.diet = diet;
            this.where = where;
            this.when = when;
            this.fact = fact;
        }

        heightComparison(dino, human)
        {
            const actualHeight = convertHeight(human[0].height);
            let dif = 0;

            if(dino.height > actualHeight)
            {
                dif = dino.height - actualHeight;
                return `The ${dino.species} is ${dif} inches taller than you`;
            }

            else if(dino.height < actualHeight)
            {
                dif = actualHeight - dino.height;
                return `The ${dino.species} is ${dif} inches shorter than you`;
            }

            else
            {
                return `The ${dino.species} is exactly as tall as you!`;
            }
        }

        weightComparison(dino, human)
        {
            let times = 0;

            if(parseFloat(dino.weight) > parseFloat(human[0].weight))
            {
                times = parseFloat(dino.weight) / parseFloat(human[0].weight);
                return `The ${dino.species} is ${times.toFixed(1)} times heavier than you`
            }

            else if(parseFloat(dino.weight) < parseFloat(human[0].weight))
            {
                times = parseFloat(human[0].weight) / parseFloat(dino.weight);
                return `You are ${times.toFixed(1)} times heavier than the ${dino.species}`
            }

            else
            {
                return `You and the ${dino.species} are equally heavy`;
            }
        }

        dietComparison(dino, human)
        {
            if(dino.diet === human.diet)
            {
                return `The ${dino.species} and you share the same diet`;
            }

            else
            {
                return `Unlike you, the ${dino.species} follows a ${dino.diet} diet!`;
            }
        }
    }

    // Human class which extends Dino class and includes comparing methods
    class Human extends Dino
    {
        constructor(species, weight, height, diet, where, when, fact, name)
        {
            super(species, weight, height, diet, where, when, fact)
            this.name = name;
        }

        compareHeight(dinos, human)
        {
            let counter = 0;
            const actualHeight = convertHeight(human[0].height);

            for(let i = 0; i < dinos.length; i++)
            {
                if(dinos[i].height > actualHeight)
                {
                    counter++;
                }
            }
            return `${counter} Dinosaurs are bigger than you`;
        }

        compareWeight(dinos, human)
        {
            let counter = 0;

            for(let i = 0; i < dinos.length; i++)
            {
                if(dinos[i].weight > human[0].weight)
                {
                    counter++;
                }
            }
            return `${counter} Dinosaurs weight more than you`;
        }

        compareDiet(dinos, human)
        {
            let counter = 0;

            for(let i = 0; i < dinos.length; i++)
            {
                if(capitalize(dinos[i].species) === "Pigeon")
                {
                    break;
                }
                if(capitalize(dinos[i].diet) === human[0].diet)
                {
                    counter++;
                }
            }

            if(counter === 0)
            {
                return `No Dinosaur shares your diet :(`;
            }

            else
            {
                return `You share the same diet with ${counter} Dinosaurs`;
            }

        }
    }

    // helper function which capitalizes first letter of a string, so compareDiet works properly
    function capitalize(str)
    {
        return str[0].toUpperCase() + str.slice(1);
    }

    // helper function which converts ft into inches so compareHeight works properly

    function convertHeight(num)
    {
        str = num.toString();
        height = str.split(".");
        ft = parseInt(height[0]) * 12;
        num = ft + parseInt(height[1]);
        return num;
    }

    /**
     * createGrid function creates : 1 div, 1 h2, 1 img, 2p element(s), appends class to div, sets content of the other elements aswell as styling certain elements and finally
     * appends all elements to div and the div to mainGrid
     */

    function createGrid(arr, human)
        {
            let mainGrid = document.getElementById("grid");

            for(let i = 0; i < (arr.length + 1); i++)
            {
                // these two if statements make sure that the loop is not going out of bounds, and the human object is being created
                if(i > 8)
                {
                    continue;
                }

                if(i === 8)
                {
                    arr[i] = human[0];
                }

                // these lines create the div, h2, img and the two p elements, and append the "grid-item" class to the div
                let card = document.createElement("div");
                card.classList.add("grid-item");
                let heading = document.createElement("h2")
                let image = document.createElement("img");
                let text = document.createElement("p");
                let fact = document.createElement("p");

                // the following lines of code are setting the content and style of the created elements
                heading.textContent = "Species: " + arr[i].species;

                image.src = `./images/${arr[i].species.toLowerCase()}.png`;
                image.style.marginBottom = "1em";

                text.textContent = `Weight: ${arr[i].weight} lbs Height: ${arr[i].height} Inch Diet: ${arr[i].diet} Where: ${arr[i].where} When: ${arr[i].when}`;
                text.style.position = "relative";
                text.style.backgroundColor = "rgba(000,000,000, 0)";

                // this checks if the dinosaurs (or the pigeon) are being created
                if(arr[i].species !== "Human")
                {
                    // this array contains comparisons between the current dinosaur and the human, 1 fact is then randomly selected as the "textcontent" of the fact
                    let factArray = [arr[i].heightComparison(arr[i], human), arr[i].weightComparison(arr[i], human), arr[i].dietComparison(arr[i], human), arr[i].fact];
                    fact.textContent = `${factArray[Math.floor(Math.random() * 4)]}`;
                }

                // this checks if the human is currently being created and sets specific values differently
                if(arr[i].species === "Human")
                {
                    heading.textContent = arr[i].name;
                    text.textContent = `Weight: ${arr[i].weight} lbs Height: ${arr[i].height} Ft Diet: ${arr[i].diet} Where: ${arr[i].where} When: ${arr[i].when}`;
                    fact.textContent = `${arr[i].compareHeight(arr, human)} ${arr[i].compareWeight(arr, human)} ${arr[i].compareDiet(arr, human)}`;
                }

                // these lines basically assemble the card and append it to the mainGrid
                card.appendChild(heading);
                card.appendChild(text);
                card.appendChild(image);
                card.appendChild(fact);
                mainGrid.appendChild(card);
            }
        }

    /**
     * this function get the data from the .json file and the form data and then creates an array of Dino-objects aswell as an array with one Human-object
     * this function also calls the createGrid function and finally removes the form from the page
     */

    async function getData(url)
    {
        let dinoArray = [];
        const response = await fetch(url);
        let dinoStats = await response.json();

        for(let i = 0; i < dinoStats.Dinos.length; i++)
        {
            dinoArray.push(new Dino(dinoStats.Dinos[i].species, parseFloat(dinoStats.Dinos[i].weight), parseInt(dinoStats.Dinos[i].height), dinoStats.Dinos[i].diet, dinoStats.Dinos[i].where, dinoStats.Dinos[i].when, dinoStats.Dinos[i].fact));
        }

        function getFormData()
        {
            /* this line of code creates an array from the form-data inputs and on that array the .reduce method is used to return an object
             * with the id of the input field as the key and the value of the input field as the value
             */
            let formData =  Array.from(document.querySelectorAll("#dino-compare input ")).reduce((accumulator, currentValue) => ({ ...accumulator, [currentValue.id] : currentValue.value}), {});
            let diet = document.getElementById("diet");
            formData["diet"] = diet.value;
            let human = [new Human("Human", formData.weight, (formData.feet + "." + formData.inches), formData.diet, where ="worldwide", when ="21st century", fact ="loves cats", formData.name)];
            return human;
        }

        humanArray = getFormData();
        createGrid(dinoArray, humanArray);
        let form = document.getElementById("dino-compare");
        form.remove();
    }

    // an eventListener on button to submit the form and create the infographic
    const dinoURL = "dino.json";
    const button = document.getElementById("btn");

    button.addEventListener("click", function formClick(event)
    {
        event.preventDefault();
        getData(dinoURL);
    });

