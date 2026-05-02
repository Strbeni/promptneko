BEGIN;

WITH top_categories(slug, name, description, icon_name, sort_order) AS (
  VALUES
    ('writing-copy', 'Writing & Copy', 'Prompts for written content, messaging, publishing, and editorial workflows.', 'pen-tool', 10),
    ('image-generation', 'Image Generation', 'Prompts for visual generation across styles, products, concepts, and mockups.', 'image', 20),
    ('code-development', 'Code & Development', 'Prompts for software engineering, architecture, testing, security, and operations.', 'code', 30),
    ('marketing-growth', 'Marketing & Growth', 'Prompts for acquisition, conversion, campaigns, and brand growth.', 'trending-up', 40),
    ('business-strategy', 'Business & Strategy', 'Prompts for planning, operations, hiring, sales, and investor communication.', 'briefcase', 50),
    ('legal-compliance', 'Legal & Compliance', 'Prompts for legal drafting, compliance review, policy analysis, and risk workflows.', 'scale', 60),
    ('research-analytics', 'Research & Analytics', 'Prompts for research synthesis, data interpretation, reports, and citations.', 'bar-chart', 70),
    ('education-training', 'Education & Training', 'Prompts for learning design, lessons, quizzes, tutoring, and courses.', 'graduation-cap', 80),
    ('productivity', 'Productivity', 'Prompts for meetings, projects, decisions, reviews, SOPs, and process documentation.', 'check-square', 90),
    ('finance', 'Finance', 'Prompts for financial analysis, investing, budgeting, risk, fundraising, and due diligence.', 'banknote', 100),
    ('design', 'Design', 'Prompts for creative direction, UX, brand systems, and design critique.', 'palette', 110),
    ('health-wellness', 'Health & Wellness', 'Prompts for fitness, nutrition, mental health support, and medical summaries.', 'heart-pulse', 120)
)
INSERT INTO categories (slug, name, description, icon_name, sort_order)
SELECT slug, name, description, icon_name, sort_order
FROM top_categories
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name,
  sort_order = EXCLUDED.sort_order,
  is_active = true;

WITH subcategories(parent_slug, slug, name, sort_order) AS (
  VALUES
    ('writing-copy', 'blog-posts', 'Blog Posts', 10),
    ('writing-copy', 'email', 'Email', 20),
    ('writing-copy', 'social-media', 'Social Media', 30),
    ('writing-copy', 'ad-copy', 'Ad Copy', 40),
    ('writing-copy', 'storytelling', 'Storytelling', 50),
    ('writing-copy', 'scriptwriting', 'Scriptwriting', 60),
    ('writing-copy', 'academic', 'Academic', 70),
    ('writing-copy', 'seo-content', 'SEO Content', 80),
    ('writing-copy', 'newsletter', 'Newsletter', 90),
    ('writing-copy', 'podcast', 'Podcast', 100),
    ('image-generation', 'portrait', 'Portrait', 10),
    ('image-generation', 'product-photography', 'Product Photography', 20),
    ('image-generation', 'architecture', 'Architecture', 30),
    ('image-generation', 'concept-art', 'Concept Art', 40),
    ('image-generation', 'logo-brand', 'Logo/Brand', 50),
    ('image-generation', 'fashion', 'Fashion', 60),
    ('image-generation', 'landscape', 'Landscape', 70),
    ('image-generation', 'abstract', 'Abstract', 80),
    ('image-generation', 'character-design', 'Character Design', 90),
    ('image-generation', 'ui-mockup', 'UI Mockup', 100),
    ('code-development', 'code-review', 'Code Review', 10),
    ('code-development', 'debugging', 'Debugging', 20),
    ('code-development', 'refactoring', 'Refactoring', 30),
    ('code-development', 'documentation', 'Documentation', 40),
    ('code-development', 'test-generation', 'Test Generation', 50),
    ('code-development', 'system-design', 'System Design', 60),
    ('code-development', 'api-design', 'API Design', 70),
    ('code-development', 'sql', 'SQL', 80),
    ('code-development', 'devops', 'DevOps', 90),
    ('code-development', 'security-audit', 'Security Audit', 100),
    ('marketing-growth', 'landing-pages', 'Landing Pages', 10),
    ('marketing-growth', 'cold-email', 'Cold Email', 20),
    ('marketing-growth', 'lead-gen', 'Lead Gen', 30),
    ('marketing-growth', 'cro', 'CRO', 40),
    ('marketing-growth', 'brand-voice', 'Brand Voice', 50),
    ('marketing-growth', 'campaign-brief', 'Campaign Brief', 60),
    ('marketing-growth', 'competitor-analysis', 'Competitor Analysis', 70),
    ('marketing-growth', 'viral-content', 'Viral Content', 80),
    ('business-strategy', 'business-plans', 'Business Plans', 10),
    ('business-strategy', 'market-research', 'Market Research', 20),
    ('business-strategy', 'pitch-decks', 'Pitch Decks', 30),
    ('business-strategy', 'okrs', 'OKRs', 40),
    ('business-strategy', 'job-descriptions', 'Job Descriptions', 50),
    ('business-strategy', 'sales-scripts', 'Sales Scripts', 60),
    ('business-strategy', 'investor-memos', 'Investor Memos', 70),
    ('business-strategy', 'meeting-agendas', 'Meeting Agendas', 80),
    ('legal-compliance', 'contract-drafting', 'Contract Drafting', 10),
    ('legal-compliance', 'risk-analysis', 'Risk Analysis', 20),
    ('legal-compliance', 'privacy-policy', 'Privacy Policy', 30),
    ('legal-compliance', 'terms-of-service', 'Terms of Service', 40),
    ('legal-compliance', 'due-diligence', 'Due Diligence', 50),
    ('legal-compliance', 'regulatory-summary', 'Regulatory Summary', 60),
    ('legal-compliance', 'nda', 'NDA', 70),
    ('legal-compliance', 'ip-protection', 'IP Protection', 80),
    ('research-analytics', 'literature-review', 'Literature Review', 10),
    ('research-analytics', 'data-interpretation', 'Data Interpretation', 20),
    ('research-analytics', 'survey-design', 'Survey Design', 30),
    ('research-analytics', 'report-generation', 'Report Generation', 40),
    ('research-analytics', 'hypothesis-testing', 'Hypothesis Testing', 50),
    ('research-analytics', 'citation-summary', 'Citation Summary', 60),
    ('education-training', 'curriculum-design', 'Curriculum Design', 10),
    ('education-training', 'lesson-plans', 'Lesson Plans', 20),
    ('education-training', 'quiz-generation', 'Quiz Generation', 30),
    ('education-training', 'explainers', 'Explainers', 40),
    ('education-training', 'tutoring', 'Tutoring', 50),
    ('education-training', 'course-outlines', 'Course Outlines', 60),
    ('productivity', 'meeting-notes', 'Meeting Notes', 10),
    ('productivity', 'project-planning', 'Project Planning', 20),
    ('productivity', 'decision-frameworks', 'Decision Frameworks', 30),
    ('productivity', 'weekly-reviews', 'Weekly Reviews', 40),
    ('productivity', 'sops', 'SOPs', 50),
    ('productivity', 'process-documentation', 'Process Documentation', 60),
    ('finance', 'financial-modeling', 'Financial Modeling', 10),
    ('finance', 'investment-memos', 'Investment Memos', 20),
    ('finance', 'budget-analysis', 'Budget Analysis', 30),
    ('finance', 'risk-reports', 'Risk Reports', 40),
    ('finance', 'fundraising', 'Fundraising', 50),
    ('finance', 'finance-due-diligence', 'Due Diligence', 60),
    ('design', 'creative-briefs', 'Creative Briefs', 10),
    ('design', 'mood-boards', 'Mood Boards', 20),
    ('design', 'ux-research', 'UX Research', 30),
    ('design', 'brand-identity', 'Brand Identity', 40),
    ('design', 'design-critique', 'Design Critique', 50),
    ('health-wellness', 'fitness-plans', 'Fitness Plans', 10),
    ('health-wellness', 'nutrition-guides', 'Nutrition Guides', 20),
    ('health-wellness', 'mental-health-support', 'Mental Health Support', 30),
    ('health-wellness', 'medical-summaries', 'Medical Summaries', 40)
)
INSERT INTO categories (slug, name, parent_category_id, sort_order)
SELECT sub.slug, sub.name, parent.id, sub.sort_order
FROM subcategories sub
JOIN categories parent ON parent.slug = sub.parent_slug
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  parent_category_id = EXCLUDED.parent_category_id,
  sort_order = EXCLUDED.sort_order,
  is_active = true;

COMMIT;
