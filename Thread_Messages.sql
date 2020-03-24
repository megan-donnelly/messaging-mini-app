SELECT conversations.id, messages.content, messages."updatedAt", users."firstName", users."lastName"
FROM conversations
	JOIN messages
		ON (conversations.id = messages."conversationId")
	JOIN users
		ON (messages."userId" = users.id)
	WHERE conversations.id = 1
	ORDER BY messages."updatedAt" DESC;