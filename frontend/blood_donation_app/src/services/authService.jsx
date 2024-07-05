const fetchData = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/protected-route', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
};

export { fetchData };
