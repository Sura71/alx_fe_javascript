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
