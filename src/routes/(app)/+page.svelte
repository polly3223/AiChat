<script lang="ts">
	import Chat from './Chat.svelte';
	import TextArea from './TextArea.svelte';

	const messages: { user: 'user' | 'ai'; text: string }[] = [
		{ user: 'user', text: 'hello' },
		{ user: 'ai', text: 'Hello! How can I help you today?' },
		{ user: 'user', text: 'I need help with my order' },
		{
			user: 'ai',
			text: `Implementing exponential moving averages (EMA) in neural networks involves updating the model's parameters based on a weighted average of the current parameter values and the new incoming data. Here's a basic outline of how you could implement EMA in a neural network:

1. **Initialize Parameters**: Start by initializing the parameters of your neural network as usual.

2. **Define EMA Coefficients**: Choose an exponential decay factor, often denoted as α (alpha), which determines the weight given to the most recent data point. Typically, α is a value between 0 and 1.

3. **Update Parameters with EMA**: During training, for each parameter in the neural network, calculate the exponential moving average using the formula:

   \(EMA_t = α \times \text{parameter}_t + (1 - α) \times \text{EMA}_{t-1}\)

   Where:
   - \(EMA_t\) is the EMA at time \(t\).
   - \(\text{parameter}_t\) is the current value of the parameter at time \(t\).
   - \(\text{EMA}_{t-1}\) is the previous EMA value.

4. **Apply EMA to Gradients (Optional)**: Additionally, you can apply EMA to the gradients during optimization to further stabilize training and prevent sudden changes in parameter updates. This is often done to achieve a smoother optimization process.

5. **Use EMA Parameters for Inference**: During inference (when making predictions), use the EMA parameters instead of the original parameters for a more stable and possibly better-performing model.

Here's a simple Python-like pseudo-code example of how you might implement EMA for the weights of a neural network layer:

\`\`\`python
# Initialize parameters and EMA variables
weights = initialize_weights()
ema_weights = weights.copy()  # Initialize EMA weights with the same values as weights

alpha = 0.9  # Exponential decay factor

# Training loop
for each batch:
    # Forward pass, backward pass, compute gradients
    # Update weights as usual
    # Update EMA weights
    for each weight in weights:
        ema_weights[weight] = alpha * weights[weight] + (1 - alpha) * ema_weights[weight]

# During inference, use EMA weights instead of original weights
\`\`\`

This is a basic example to illustrate the concept. Depending on your specific implementation and framework, you may need to adapt it accordingly.`
		},
		{ user: 'user', text: '123456' }
	];
</script>

<div class="flex flex-col h-[calc(100dvh-56px)] lg:h-dvh">
	<div class="overflow-auto px-6 py-4">
		<Chat {messages} />
	</div>
	<div class="mt-auto px-6 py-4">
		<TextArea />
	</div>
</div>
