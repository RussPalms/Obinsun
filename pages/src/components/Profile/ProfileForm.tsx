import { useRef } from 'react';

function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // optional: Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <form className="relative h-full max-w-[40%]" onSubmit={submitHandler}>
      <div className="inputBox">
        {/* <label htmlFor='email'>Your Email</label> */}
        <p>{props.passwordResponse.message}</p>
        <input
          className="input input-glass-container"
          type="password"
          placeholder="new password"
          id="new-password"
          required
          ref={newPasswordRef}
        />
      </div>
      <div className="inputBox">
        {/* <label htmlFor='password'>Your Password</label> */}
        <input
          className="input input-glass-container"
          type="password"
          placeholder="old password"
          id="old-password"
          required
          ref={oldPasswordRef}
        />
      </div>
      <div className="inputBox">
        <input
          className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/90 dark:bg-gray-300/90 max-w-[12.25em] cursor-pointer mb-[1.25em] font-semibold"
          type="submit"
          value="Change Password"
        />
      </div>
    </form>
  );
}

export default ProfileForm;
