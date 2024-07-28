// Initialize the quotes array from local storage or default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    category: "Wisdom",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const exportQuotesButton = document.getElementById("exportQuotes");
const importFileInput = document.getElementById("importFile");

// Function to display a random quote
const showRandomQuote = () => {
  quoteDisplay.innerHTML = "";

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteText = document.createElement("p");
  quoteText.textContent = `Quote: ${randomQuote.text}`;
  quoteDisplay.appendChild(quoteText);

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `Category: ${randomQuote.category}`;
  quoteDisplay.appendChild(quoteCategory);

  // Save the last viewed quote to session storage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
};

// Function to add a new quote
const addQuote = () => {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quote added successfully!");
  } else {
    alert("Please enter both text and category.");
  }
};

// Function to export quotes to a JSON file
const exportQuotesToJson = () => {
  const dataStr = JSON.stringify(quotes, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

// Function to import quotes from a JSON file
const importFromJsonFile = (event) => {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
};

// Event listener for the "Show New Quote" button
newQuoteButton.addEventListener("click", showRandomQuote);

// Event listener for the "Export Quotes" button
exportQuotesButton.addEventListener("click", exportQuotesToJson);

// Event listener for the "Import Quotes" input
importFileInput.addEventListener("change", importFromJsonFile);

// Initial call to display a random quote when the page loads
showRandomQuote();

// Load the last viewed quote from session storage if available
const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
if (lastQuote) {
  quoteDisplay.innerHTML = "";

  const quoteText = document.createElement("p");
  quoteText.textContent = `Quote: ${lastQuote.text}`;
  quoteDisplay.appendChild(quoteText);

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `Category: ${lastQuote.category}`;
  quoteDisplay.appendChild(quoteCategory);
}
// Initialize the quotes array from local storage or default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    category: "Wisdom",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const exportQuotesButton = document.getElementById("exportQuotes");
const importFileInput = document.getElementById("importFile");
const categoryFilter = document.getElementById("categoryFilter");

// Function to populate category filter dropdown
const populateCategories = () => {
  const categories = [...new Set(quotes.map((quote) => quote.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Set last selected category filter from local storage
  const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
};

// Function to display a random quote
const showRandomQuote = () => {
  quoteDisplay.innerHTML = "";

  let filteredQuotes = quotes;
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(
      (quote) => quote.category === selectedCategory
    );
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  const quoteText = document.createElement("p");
  quoteText.textContent = `Quote: ${randomQuote.text}`;
  quoteDisplay.appendChild(quoteText);

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `Category: ${randomQuote.category}`;
  quoteDisplay.appendChild(quoteCategory);

  // Save the last viewed quote to session storage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
};

// Function to add a new quote
const addQuote = () => {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quote added successfully!");
    populateCategories(); // Update categories dropdown
  } else {
    alert("Please enter both text and category.");
  }
};

const filterQuotes = () => {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("lastSelectedCategory", selectedCategory);
  showRandomQuote();
};

// Function to export quotes to a JSON file
const exportQuotesToJson = () => {
  const dataStr = JSON.stringify(quotes, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

// Function to import quotes from a JSON file
const importFromJsonFile = (event) => {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quotes imported successfully!");
    populateCategories(); // Update categories dropdown
  };
  fileReader.readAsText(event.target.files[0]);
};

// Event listener for the "Show New Quote" button
newQuoteButton.addEventListener("click", showRandomQuote);

// Event listener for the "Export Quotes" button
exportQuotesButton.addEventListener("click", exportQuotesToJson);

// Event listener for the "Import Quotes" input
importFileInput.addEventListener("change", importFromJsonFile);

// Initial call to populate categories dropdown
populateCategories();

// Initial call to display a random quote when the page loads
showRandomQuote();

// Load the last viewed quote from session storage if available
const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
if (lastQuote) {
  quoteDisplay.innerHTML = "";

  const quoteText = document.createElement("p");
  quoteText.textContent = `Quote: ${lastQuote.text}`;
  quoteDisplay.appendChild(quoteText);

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `Category: ${lastQuote.category}`;
  quoteDisplay.appendChild(quoteCategory);
}
// Initialize the quotes array from local storage or default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    category: "Wisdom",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const exportQuotesButton = document.getElementById("exportQuotes");
const importFileInput = document.getElementById("importFile");
const categoryFilter = document.getElementById("categoryFilter");
const notification = document.getElementById("notification");

// Function to populate category filter dropdown
const populateCategories = () => {
  const categories = [...new Set(quotes.map((quote) => quote.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Set last selected category filter from local storage
  const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
};

// Function to display a random quote
const showRandomQuote = () => {
  quoteDisplay.innerHTML = "";

  let filteredQuotes = quotes;
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(
      (quote) => quote.category === selectedCategory
    );
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  const quoteText = document.createElement("p");
  quoteText.textContent = `Quote: ${randomQuote.text}`;
  quoteDisplay.appendChild(quoteText);

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `Category: ${randomQuote.category}`;
  quoteDisplay.appendChild(quoteCategory);

  // Save the last viewed quote to session storage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
};

// Function to add a new quote
const addQuote = () => {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quote added successfully!");
    populateCategories(); // Update categories dropdown
  } else {
    alert("Please enter both text and category.");
  }
};

let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    category: "Wisdom",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const exportQuotesButton = document.getElementById("exportQuotes");
const importFileInput = document.getElementById("importFile");
const categoryFilter = document.getElementById("categoryFilter");
const notification = document.getElementById("notification");

const populateCategories = () => {
  const categories = [...new Set(quotes.map((quote) => quote.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
};

const showRandomQuote = () => {
  quoteDisplay.innerHTML = "";

  let filteredQuotes = quotes;
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(
      (quote) => quote.category === selectedCategory
    );
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  const quoteText = document.createElement("p");
  quoteText.textContent = `Quote: ${randomQuote.text}`;
  quoteDisplay.appendChild(quoteText);

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `Category: ${randomQuote.category}`;
  quoteDisplay.appendChild(quoteCategory);

  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
};

const addQuote = async () => {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    await postQuoteToServer(newQuote);
    alert("Quote added successfully!");
    populateCategories();
  } else {
    alert("Please enter both text and category.");
  }
};

const filterQuotes = () => {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("lastSelectedCategory", selectedCategory);
  showRandomQuote();
};

const exportQuotesToJson = () => {
  const dataStr = JSON.stringify(quotes, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const importFromJsonFile = (event) => {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quotes imported successfully!");
    populateCategories();
  };
  fileReader.readAsText(event.target.files[0]);
};

const fetchQuotesFromServer = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverQuotes = await response.json();
    return serverQuotes.map((quote) => ({
      text: quote.title, // Use title for demonstration
      category: "General", // Use a default category
    }));
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
    return [];
  }
};

const postQuoteToServer = async (quote) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quote),
    });
    return await response.json();
  } catch (error) {
    console.error("Error posting quote to server:", error);
  }
};

const syncQuotes = async () => {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuoteTexts = quotes.map((quote) => quote.text);

  const newQuotes = serverQuotes.filter(
    (serverQuote) => !localQuoteTexts.includes(serverQuote.text)
  );

  if (newQuotes.length > 0) {
    quotes.push(...newQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    notification.textContent = "New quotes have been synced from the server.";
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
    populateCategories();
  }
};

newQuoteButton.addEventListener("click", showRandomQuote);
exportQuotesButton.addEventListener("click", exportQuotesToJson);
importFileInput.addEventListener("change", importFromJsonFile);

populateCategories();
showRandomQuote();

const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
if (lastQuote) {
  quoteDisplay.innerHTML = "";

  const quoteText = document.createElement("p");
  quoteText.textContent = `Quote: ${lastQuote.text}`;
  quoteDisplay.appendChild(quoteText);

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `Category: ${lastQuote.category}`;
  quoteDisplay.appendChild(quoteCategory);
}

setInterval(syncQuotes, 60000);
syncQuotes();