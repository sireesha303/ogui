import React from 'react';
// import Form from '@rjsf/core';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { RJSFSchema, UiSchema } from '@rjsf/utils';




const schema: RJSFSchema = {
    type: 'object',
    "title": "My title",
    "description": "My description",
    properties: {
        firstName: {
            type: 'string',
            title: 'First Name',
            minLength: 10
        },
        lastName: {
            type: 'string',
            title: 'Last Name',
            maxLength: 4
        },
        age: {
            type: 'number',
            title: 'Age',

        },
        password: {
            type: 'string',
            title: 'Password',
            minLength: 8, // Minimum length requirement
            pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]+$',
            description:
                'At least 8 characters, including at least one letter and one number.'
        },
        additionalItems: {
            type: "boolean"
        },
        check: {
            type: "string",
            enum: ["one", "two", "three"]
        },
        multiChoiceWithCheckBox: {
            type: "array",
            title: "A multiple-choice list With Checkboxes",
            items: {
                type: "string",
                enum: ["foo", "bar", "fuzz", "qux"],
            },
            uniqueItems: true
        },
        multiChoiceWithArray: {
            type: "array",
            title: "A multiple-choice list With Array",
            items: {
                type: "string",
                enum: ["foo", "bar", "fuzz", "qux"],
            },
            uniqueItems: true
        },
        done: {
            type: "string",
            enum: ["foo", "bar", "fuzz", "qux"],
        },
        fileUpload: {
            type: "string",
            format: "data-url",
        }
    },
    "required": ["firstName", "age", "additionalItems"],
    "dependencies": {
        "firstName": ["lastName"]
    }
};

const uiSchema: UiSchema = {

    "ui:order": ["firstName", "lastName", "age", "password", "multiChoiceWithArray", "someNumber", "check", "multiChoiceWithCheckBox", "additionalItems", "done", "fileUpload"],
    multiChoiceWithCheckBox: {
        "ui:widget": "checkboxes",
        "ui:options": {
            inline: true,
            addable: false
        }
        // "ui:options": {

        // },
    },
    fileUpload: {
        "ui:widget": "file",
        "ui:options": { accept: ".pdf" }
    },
    done: {
        "ui:widget": "radio" // could also be "select"
    },
    password: {
        'ui:widget': 'password'
    },
    firstName: {
        'ui:placeholder': 'Enter your first name',
        "ui:autofocus": true,
        required: true
    },
    lastName: {
        'ui:placeholder': 'Enter your last name'
    },
    age: {
        "ui:help": "The Age that can be used to contact you"
    }
};

const ExampleForm = () => {
    const handleSubmit = ({ formData }: any) => {
        console.log('Form data submitted:', formData);
    };


    return (
        <div>
            <h1>React JSON Schema Form Example</h1>
            <Form
                schema={schema}
                uiSchema={uiSchema}
                onSubmit={handleSubmit}
                validator={validator}
                liveValidate={false}
                noHtml5Validate
            />
        </div>
    );
};

export default ExampleForm;
