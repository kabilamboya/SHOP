import json
from transformers import AutoTokenizer, AutoModelForQuestionAnswering, Trainer, TrainingArguments
from transformers import pipeline
from flask import Flask, request, jsonify

# Load your content
page_content = """
In a world where technology evolves at a breakneck pace, staying abreast of the latest innovations has become a thrilling journey...
(Include the rest of your page content here)
"""

# Prepare the data for fine-tuning
def create_dataset(content):
    # Define your dataset here
    return {
        "data": [
            {
                "title": "O!clok Blog",
                "paragraphs": [
                    {
                        "context": content,
                        "qas": [
                            {
                                "id": "1",
                                "question": "What is the blog about?",
                                "answers": [
                                    {
                                        "text": "The blog discusses the latest trends in technology and smart devices.",
                                        "answer_start": content.find("The blog discusses")
                                    }
                                ]
                            }
                            # Add more questions and answers based on the content
                        ]
                    }
                ]
            }
        ]
    }

# Save dataset as JSON
dataset = create_dataset(page_content)
with open('dataset.json', 'w') as f:
    json.dump(dataset, f)

# Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
model = AutoModelForQuestionAnswering.from_pretrained("distilbert-base-uncased")

# Load the dataset
from datasets import load_dataset
dataset = load_dataset('json', data_files='dataset.json', split='train')

# Define training arguments
training_args = TrainingArguments(
    per_device_train_batch_size=1,
    num_train_epochs=1,
    logging_dir='./logs',
)

# Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
)

# Train the model
trainer.train()

# Save the model
model.save_pretrained("trained_model")
tokenizer.save_pretrained("trained_model")

# Create Flask app
app = Flask(__name__)

# Load model and tokenizer for inference
tokenizer = AutoTokenizer.from_pretrained("trained_model")
model = AutoModelForQuestionAnswering.from_pretrained("trained_model")
nlp = pipeline("question-answering", model=model, tokenizer=tokenizer)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('message', '')
    context = page_content
    result = nlp(question=question, context=context)
    return jsonify({'response': result['answer']})

if __name__ == '__main__':
    app.run(port=5000)
