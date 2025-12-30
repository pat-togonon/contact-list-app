# Contact List App

CRUD app for storing your contacts. The backend api it consumes is from a Java & Spring Boot-based backend (excluded).

<h3>Tech Stack</h3>
JavaScript, ReactJS, HTML, CSS, Redux Toolkit, React Router

<h2>User Interface</h2>
The landing page users see when they access the app:

<img src="/images/1-landing-page.png" />

The mobile version looks like this:

<img src="/images/1-landing-page-mobile-ver.png" />

<h2>CRUD Operations</h2>

<h3>1. Read</h3>

As shown from the User Interface section above.

<h3>2. Create</h3>

The form has validations on each input tag and upon the submission of the form.

<img src="/images/4-add-in-new-contact.png" />

Once successful, a confirmation modal appears:

<img src="/images/5-add-new-contact-confirmation.png" />

<h3>3. Update</h3>

When user clicks on the Update button, the form is filled with the contact's information.

The user can then make changes on the form and hit the Update button.

<img src="/images/2-update-contact.png" />

Once updated, a confirmation modal is shown:

<img src="/images/3-update-contact-confirmation.png" />

<h3>4. Delete</h3>

For the delete operation, user sees a confirmation modal asking if they want to delete the contact. 

<img src="/images/7-delete-contact.png" />

And when they click on Delete and the contact is successfully deleted, a confirmation modal is shown:

<img src="/images/8-delete-contact-confirmation.png" />

<h2>Others</h2>

<h4>Errors</h4>
The app also handles errors (with a modal as well), page not found, network error, and when a contact id is invalid.

<h4>Form Validation</h4>
The app uses regex to test the user inputs.

And if the contact number or email is already in use, the user won't be able to add this in. 

<h4>Single Contact View</h4>
When user clicks on View button on the landing page, they can check out the contact details as follows:

<img src="/images/6-view-contact-details.png" />

When the list is available, the app takes the contact details from it. 

But when the list is unavailable (e.g. due to page refresh), the app fetches the contact details by id from the Java-backend api.

Thank you!

