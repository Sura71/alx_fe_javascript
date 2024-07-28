// Initialize quotes array from localStorage or with default quotes
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
const addQuoteButton = document.getElementById("addQuoteButton");
const exportQuotesButton = document.getElementById("exportQuotes");
const importFileInput = document.getElementById("importFile");
const categoryFilter = document.getElementById("categoryFilter");
const notification = document.getElementById("notification");

// Populate categories in the dropdown
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

// Show a random quote based on the selected category
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

// Add a new quote and update local storage and server
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

// Filter quotes based on the selected category
const filterQuotes = () => {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("lastSelectedCategory", selectedCategory);
  showRandomQuote();
};

// Export quotes to a JSON file
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

// Import quotes from a JSON file
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

// Fetch quotes from the mock server
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

// Post a new quote to the mock server
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

// Sync quotes with the server and handle conflicts
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

// Event Listeners
newQuoteButton.addEventListener("click", showRandomQuote);
addQuoteButton.addEventListener("click", addQuote);
exportQuotesButton.addEventListener("click", exportQuotesToJson);
importFileInput.addEventListener("change", importFromJsonFile);

// Initialize the application
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

// Periodically sync quotes with the server
setInterval(syncQuotes, 60000);
syncQuotes();
