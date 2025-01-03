import { first } from "rxjs";
import { OperationCanceledException } from "typescript";

class TrainingModule {
    constructor(moduleName) {
        this.moduleName = moduleName;
        this.assignments = [];
    }

    addAssignment(name, descriptions, thresholds) {
        const assignment = {
            name: name,
            descriptions: {
                beginner: descriptions.beginner,
                intermediate: descriptions.intermediate,
                advanced: descriptions.advanced
            },
            thresholds: {
                beginner: thresholds.beginner,
                intermediate: thresholds.intermediate,
                advanced: thresholds.advanced
            }
        };
        this.assignments.push(assignment);
    }

    getAssignment(index) {
        return this.assignments[index];
    }

    getAssignmentCount() {
        return this.assignments.length;
    }
}

// Example usage:
const module = new TrainingModule("Programming Basics");
module.addAssignment(
    "Variables",
    {
        beginner: "Declare simple variables",
        intermediate: "Use different variable types",
        advanced: "Understand variable scope"
    },
    {
        beginner: 70,
        intermediate: 80,
        advanced: 90
    }
);

const robotModule = new TrainingModule("Getting Started with the GO2");
robotModule.description = `
This module is meant to get you started with GO2 robot. 
By the end of this module you will be familiarized with the robots movement capabilities and the control app. 
This module is designed to run fully in the simulator, so you don't worry about running the robot into walls just yet.

The estimated length of this module is 5 minutes.

Have Fun!

- AI Support Team
`;

robotModule.addAssignment(
    "Wake Up!",
    "",
    {
        beginner: "Basic forward and backward movement",
        intermediate: "Turning and precise positioning",
        advanced: "Complex movement patterns and obstacle avoidance"
    },
    {
        beginner: 65,
        intermediate: 75,
        advanced: 85
    }
);

robotModule.addAssignment(
    "Sensors",
    {
        beginner: "Reading basic sensor data",
        intermediate: "Processing multiple sensor inputs",
        advanced: "Sensor fusion and advanced filtering"
    },
    {
        beginner: 60,
        intermediate: 80,
        advanced: 90
    }
);
`
Getting Started with the Unitree GO2

This module is meant to get you started with GO2 robot. 
By the end of this module you will be familiarized with the robot hardware and the control app. 

The estimated length of this module is 3 minutes.

Have Fun!

- AI Support Team
-------------------------------------------------------------------------------------------------------------------------------------------------------------
Title: Safety First!

Text = [It's important to remember that the GO2 is not a toy and should always be operated with caution.
Always be mindful of your surroundings when operating the robot] camera control = animate to coord(0,0,1)

[Keep these safety tips in mind when operating the GO2] camera control = animate to coord(1,0,1)

[DO NOT
touch the robot while it is in operation
operate the robot near stairs or ledges
stress the robot by pushing or pulling it
operate the robot in wet or dusty conditions

DO
use obstacle avoidance in tight spaces and large crowds
be extra careful operating in the presence of children or pets
] camera control = spin camera around coord(0,0,1)



    "title": "Safety First!",
    "sections": [
        {
            "sectionTitle": "Safety Disclosure!",
            "text": [
                "It's important to remember that the GO2 is not a toy and should always be operated with caution.",
                "Always be mindful of your surroundings when operating the robot"
            ],
            "camera": {
                "type": "animate",
                "coordinates": [0, 0, 1]
            }
        },
        {
            "sectionTitle": "Tips for Safe Operation",
            "text": [
                "Keep these safety tips in mind when operating the GO2"
            ],
            "camera": {
                "type": "animate",
                "coordinates": [1, 0, 1]
            }
        },
        {
            "sectionTitle": "The Do's and Don'ts of Operating the GO2",
            "text": {
                [
                    "DO NOT
                    touch the robot while it is in operation
                    operate the robot near stairs or ledges
                    stress the robot by pushing or pulling it
                    operate the robot in wet or dusty conditions",
                    "DO
                    use obstacle avoidance in tight spaces and large crowds
                    be extra careful operating in the presence of children or pets"
                ] 
            },
            "camera": {
                "type": "spin",
                "coordinates": [0, 0, 1]
            }
        }
    ]
















--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Did we create an app?
Yes, we did! The Unitree GO2 EDU Robot Interface App is a web-based application that allows you to control the robot using a simple interface.
This application was specially designed by the Central Connecticut State University AI Support Team to make programming the GO2 robot accessible to everyone.
Regardless of your experience level, you can use the app to control the robot and practice your programming skills.

Let's familarize ourselves with the applications interface.

At the top of the window you will find the title bar. Here you will find important status information regarding the Robot.
Connection status, battery level, and the robot name are all displayed here.

To the left of the screen, where you are reading this text, you will find the text editor.
The text editor is where you will write your programs to control the robot.
It is also where you will receive instructions and information about the robot and its capabilities.
At the bottom right of the text editor you will see a filter button. This button allows you to at any moment change the difficulty level of an assignment.
This will change the text editor to show only the instructions for that difficulty level.
When it is avaiable the button will go from transparent to solid.

To the right of the screen you will find the simulator.

-------------------------------------------------------------------------------------------
The Simulator
The simulator is a virtual environment where you operate the robot without any worry.
This is a great place to practice your programming skills and test out new ideas.

Let's start by familiarizing ourselves with the simulator interface.

On the bottom left of the simulator, you will find the 
`;







const safetyModule = {
    "title": "Safety First!",
    "sections": [
        {
            "sectionTitle": "Safety Disclosure!",
            "text": [
                "It's important to remember that the GO2 is not a toy and should always be operated with caution.",
                "Always be mindful of your surroundings when operating the robot"
            ],
            "camera": {
                "type": "spin",
                "coordinates": [2.25, 0.90, -0.02]
            }
        },
        {
            "sectionTitle": "Tips for Safe Operation",
            "text": [
                "Keep these safety tips in mind when operating the GO2"
            ],
            "camera": {
                "type": "spin",
                "coordinates": [-0.01, 0.67, 0.76]
            }
        },
        {
            "sectionTitle": "The Do's and Don'ts of Operating the GO2",
            "text": [
                `DO NOT
touch the robot while it is in operation
operate the robot near stairs or ledges
stress the robot by pushing or pulling it
operate the robot in wet or dusty conditions`,
                `DO
use obstacle avoidance in tight spaces and large crowds
be extra careful operating in the presence of children or pets`,
`You are now ready to move on to the next module.`
            ],
            "camera": {
            }
        }
    ]
}

const appTrainingModule = {
    "title": "Getting Started with the GO2 Interface",
    "sections": [
        {
            "sectionTitle": "Welcome!",
            "text": [
                "Did we create an app?",
                "Yes, we did! The Unitree GO2 EDU Robot Interface App is a web-based application that allows you to control the robot using a simple interface.",
                "This application was specially designed by the Central Connecticut State University AI Support Team to make programming the GO2 robot accessible to everyone.",
                "Regardless of your experience level, you can use the app to control the robot and practice your programming skills."
            ],
            "camera": {
                "type": "focus",
                "coordinates": [0, 1, 2]
            }
        },
        {
            "sectionTitle": "Interface Overview",
            "text": [
                `Title Bar
Located at the top of the window
Displays: Connection status, Battery level, Robot name`,
                `Text Editor
Located on the left side
Where you write programs and receive instructions
Filter button at bottom right for difficulty levels`
            ],
            "camera": {
                "type": "pan",
                "coordinates": [1, 1, 0]
            }
        },
        {
            "sectionTitle": "The Simulator",
            "text": [
                "The simulator is a virtual environment where you operate the robot without any worry.",
                "This is a great place to practice your programming skills and test out new ideas.",
                `Simulator Controls:
- Left click and drag to rotate view
- Right click and drag to pan
- Scroll wheel to zoom
- Press R to reset view`
            ],
            "camera": {
                "type": "showcase",
                "coordinates": [2, 1, 2]
            }
        },
        {
            "sectionTitle": "Practice Time!",
            "text": [
                "Let's try out the simulator controls!",
                "1. Try rotating the view around the robot",
                "2. Zoom in and out to see different perspectives",
                "3. Reset the view using the R key"
            ],
            "camera": {
                "type": "interactive",
                "coordinates": [0, 0, 0]
            }
        }
    ]
};