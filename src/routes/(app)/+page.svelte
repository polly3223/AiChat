<script lang="ts">
	import Chat from './Chat.svelte';
	import TextArea from './TextArea.svelte';

	const messages: { user: 'user' | 'ai'; text: string }[] = [
		{ user: 'user', text: 'hello' },
		{
			user: 'ai',
			text: `Sure! Here's a function in each of the requested languages to find the maximum number in a list:

1. Python:
\`\`\`python
def find_max(nums):
    if not nums:
        return None
    return max(nums)
\`\`\`

2. TypeScript:
\`\`\`typescript
function findMax(nums: number[]): number | undefined {
    if (nums.length === 0) {
        return undefined;
    }
    return Math.max(...nums);
}
\`\`\`

3. Java:
\`\`\`java
import java.util.Collections;
import java.util.List;

public class MaxNumber {
    public static Integer findMax(List<Integer> nums) {
        if (nums.isEmpty()) {
            return null;
        }
        return Collections.max(nums);
    }
}
\`\`\`

4. Rust:
\`\`\`rust
fn find_max(nums: &[i32]) -> Option<i32> {
    if nums.is_empty() {
        None
    } else {
        Some(*nums.iter().max().unwrap())
    }
}
\`\`\`

These functions take a list of numbers as input and return the maximum number in the list.            
            
            `
		},
		{ user: 'user', text: '123456' },
		{
			user: 'ai',
			text: `heloo geloo`
		},
		{ user: 'user', text: '123456' }
	];
</script>

<div class="flex flex-col h-[calc(100dvh-56px)] lg:h-dvh">
	<div class="overflow-auto p-2">
		<Chat {messages} />
	</div>
	<div class="mt-auto p-2 pt-0">
		<TextArea />
	</div>
</div>
