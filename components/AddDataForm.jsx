'use client';

import { updateUser } from '@/app/actions/formActions';

// This is a form component that will be used to add data to the database
const AddDataForm = () => {
  return (
    <>
      <section className="mt-20 w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-8">Add User</h2>
        <form
          action={async (formData) => {
            await addUser(formData);
          }}
          className="form-control"
        >
          <div className="label">
            <span className="label-text">Enter a name?</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input bg-base-300 w-full mb-3"
            required
          />
          <div className="label">
            <span className="label-text">Enter an email?</span>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input bg-base-300 w-full mb-3"
            required
          />
          <button className="btn btn-accent mt-4">Add User</button>
        </form>
      </section>
      <section className="mt-20 w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-8">Update User</h2>
        <form
          action={async (formData) => {
            await updateUser(formData);
          }}
          className="form-control mx-auto"
        >
          <div className="label">
            <span className="label-text">Enter a name?</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input bg-base-300 w-full mb-3"
            required
          />
          <div className="label">
            <span className="label-text">Enter an email?</span>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input bg-base-300 w-full mb-3"
            required
          />
          <div className="label">
            <span className="label-text">Enter new email?</span>
          </div>
          <input
            type="email"
            name="new-email"
            placeholder="New Email"
            className="input bg-base-300 w-full mb-3"
            required
          />
          <button className="btn btn-accent mt-4">Update User</button>
        </form>
      </section>
    </>
  );
};
export default AddDataForm;
