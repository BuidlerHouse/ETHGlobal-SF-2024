import anthropic
import os

# Create an instance of the Anthropics API client
client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY", ""))  

def generate_code(prompt: str) -> str:
    response = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text

def test():
    output = generate_code("I want you to generate a gomoku board with 5x5 size and 3 in a row to win html code, you should use tailwind css for styling, and output the code included css js in the html block, please don't output any other text")
    with open('index.html', 'w') as file:
        file.write(output)

if __name__ == "__main__":
    test()
