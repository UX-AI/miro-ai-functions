// Initialize the Miro SDK
miro.onReady(() => {
    console.log('Miro SDK is ready');
  });
  
  // Handle the Generate button click
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
  
    // Add the generated text as a widget to the Miro board
    await miro.board.widgets.create({
      type: 'text',
      text: generatedText,
      x: 100, // Adjust position on the board
      y: 100,
    });
  
    alert('Generated content added to the board!');
  });
  