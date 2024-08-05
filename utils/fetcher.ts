const fetcher = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('An error occurred while fetching data');
  }
};

export default fetcher;
