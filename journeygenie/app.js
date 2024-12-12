document.getElementById('generate').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    if (!prompt) {
      alert('Please enter a prompt!');
      return;
    }
  
    // Call your Netlify function to generate content
    const response = await fetch('https://cheerful-hamster-bdd9d7.netlify.app/.netlify/functions/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
  
    const data = await response.json();
    const generatedText = data.text;
  
    // Show the generated text in the sidebar
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = generatedText;
  
    // Add the content to the Miro board
    await miro.board.widgets.create({
      type: 'text',
      text: generatedText,
      x: 0,
      y: 0,
    });
  
    alert('Generated content added to the board!');
  });
  