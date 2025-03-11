export const exportJSON = (data, filename = "workflow.json") => {
  try {
    // Validate that data is an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format. Expected an array.");
    }
    
    // Create a formatted JSON string
    const jsonStr = JSON.stringify(data, null, 2);
    
    // Create a blob with JSON data and generate a temporary URL
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Clean up: remove the anchor element and revoke the URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Export failed:", error.message);
    alert("Export failed: " + error.message);
  }
};

export const importJSON = (event, setNodes) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const result = e.target.result;
      if (!result) {
        throw new Error("File is empty");
      }
      const importedData = JSON.parse(result);
      
      // Validate that the imported data is an array
      if (!Array.isArray(importedData)) {
        throw new Error("Imported JSON is not an array.");
      }
      
      // Optionally, add additional validation on node properties if needed:
      if (!importedData.every(node => node.id && node.type && node.position && node.data)) {
        throw new Error("Missing required node properties.");
      }

      setNodes(importedData);
    } catch (error) {
      console.error("Import failed:", error);
      alert("Error importing JSON: " + error.message);
    }
  };

  reader.onerror = () => {
    console.error("File reading error.");
    alert("Error reading file.");
  };

  reader.readAsText(file);
};
