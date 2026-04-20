## Before You Prompt (GOLDEN Gate)
- **Goal**: Build Claude API integration that generates structured site content JSON from client onboarding data
- **Output**: Claude API caller with Pydantic models matching `site_content.content_json` schema, template-aware prompts for all 3 templates, validation + retry on malformed output
- **Limits**: Generation module only, no pipeline integration. Input: onboarding data dict. Output: validated Pydantic model. Must cost <$0.15/site
- **Data**: Load 02-architecture.md §Template System for content slots and §Data Flow by Stage (AI Build row)
- **Evaluation**: 1. Generates valid JSON for all 3 templates 2. Passes Pydantic validation 3. Cost <$0.15/site 4. Handles Claude API errors gracefully
- **Next**: Consumed by `generate_site` ARQ job (Task 11)

## Framework
- Use PRISM for prompt engineering (extended thinking on prompt design)
