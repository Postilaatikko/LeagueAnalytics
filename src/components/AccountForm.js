const AccountForm = ({ filter, onChange, onClick }) => {
	return (
		<form onSubmit={onClick}>
			Find your account <input value={filter} onChange={onChange} />
			<button type="submit">search</button>
		</form>
	);
};

export default AccountForm;
