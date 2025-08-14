-- 1. Dataset Overview and Basic Statistics
SELECT 
    COUNT(*) as total_feedback_records,
    COUNT(DISTINCT user_id) as unique_customer_voices,
    COUNT(DISTINCT channel) as feedback_channels,
    AVG(sentiment_score) as avg_sentiment_score,
    MIN(timestamp) as earliest_feedback,
    MAX(timestamp) as latest_feedback,
    COUNT(CASE WHEN status = 'complete' THEN 1 END) as completed_feedback,
    COUNT(CASE WHEN status = 'complete' THEN 1 END) * 100.0 / COUNT(*) as completion_rate
FROM customer_voice_dataset;

-- 2. Sentiment Analysis by Channel and Category
SELECT 
    channel,
    sentiment,
    COUNT(*) as feedback_count,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY channel) as percentage_by_channel,
    AVG(sentiment_score) as avg_sentiment_score,
    STDDEV(sentiment_score) as sentiment_score_stddev
FROM customer_voice_dataset
GROUP BY channel, sentiment
ORDER BY channel, sentiment;

-- 3. Category Performance Analysis
SELECT 
    category,
    COUNT(*) as total_mentions,
    AVG(sentiment_score) as avg_sentiment,
    COUNT(CASE WHEN sentiment = 'positive' THEN 1 END) as positive_count,
    COUNT(CASE WHEN sentiment = 'negative' THEN 1 END) as negative_count,
    COUNT(CASE WHEN sentiment = 'neutral' THEN 1 END) as neutral_count,
    COUNT(CASE WHEN priority = 'critical' THEN 1 END) as critical_issues,
    COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority_issues
FROM customer_voice_dataset
GROUP BY category
ORDER BY total_mentions DESC;

-- 4. Priority Distribution and Escalation Analysis
SELECT 
    priority,
    COUNT(*) as issue_count,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () as percentage_distribution,
    AVG(sentiment_score) as avg_sentiment_by_priority,
    COUNT(CASE WHEN status = 'complete' THEN 1 END) as resolved_count,
    COUNT(CASE WHEN status = 'complete' THEN 1 END) * 100.0 / COUNT(*) as resolution_rate
FROM customer_voice_dataset
GROUP BY priority
ORDER BY 
    CASE priority 
        WHEN 'critical' THEN 1 
        WHEN 'high' THEN 2 
        WHEN 'medium' THEN 3 
        WHEN 'low' THEN 4 
    END;

-- 5. Temporal Analysis - Monthly Feedback Trends
SELECT 
    DATE_TRUNC('month', timestamp) as feedback_month,
    COUNT(*) as monthly_feedback_count,
    AVG(sentiment_score) as monthly_avg_sentiment,
    COUNT(CASE WHEN sentiment = 'positive' THEN 1 END) as positive_feedback,
    COUNT(CASE WHEN sentiment = 'negative' THEN 1 END) as negative_feedback,
    COUNT(DISTINCT user_id) as unique_users_monthly,
    COUNT(CASE WHEN priority IN ('critical', 'high') THEN 1 END) as high_priority_issues
FROM customer_voice_dataset
GROUP BY DATE_TRUNC('month', timestamp)
ORDER BY feedback_month;

-- 6. User Engagement and Power User Analysis
SELECT 
    user_id,
    COUNT(*) as feedback_frequency,
    AVG(sentiment_score) as user_avg_sentiment,
    MIN(timestamp) as first_feedback,
    MAX(timestamp) as last_feedback,
    COUNT(DISTINCT category) as categories_engaged,
    COUNT(DISTINCT channel) as channels_used,
    CASE 
        WHEN COUNT(*) >= 5 THEN 'Power User'
        WHEN COUNT(*) >= 2 THEN 'Regular User'
        ELSE 'Occasional User'
    END as user_segment
FROM customer_voice_dataset
GROUP BY user_id
ORDER BY feedback_frequency DESC;

-- 7. Channel Performance and Effectiveness Analysis
SELECT 
    channel,
    COUNT(*) as total_feedback,
    AVG(sentiment_score) as channel_sentiment_avg,
    COUNT(CASE WHEN status = 'complete' THEN 1 END) as resolved_feedback,
    COUNT(CASE WHEN status = 'complete' THEN 1 END) * 100.0 / COUNT(*) as resolution_rate,
    AVG(CASE WHEN status = 'complete' THEN 
        EXTRACT(EPOCH FROM (updated_at - timestamp))/3600 
    END) as avg_resolution_hours,
    COUNT(CASE WHEN priority = 'critical' THEN 1 END) as critical_issues_by_channel
FROM customer_voice_dataset
GROUP BY channel
ORDER BY total_feedback DESC;

-- 8. Sentiment Accuracy and Model Performance Metrics
WITH sentiment_predictions AS (
    SELECT 
        feedback_id,
        sentiment as actual_sentiment,
        predicted_sentiment,
        sentiment_score,
        CASE 
            WHEN sentiment = predicted_sentiment THEN 1 
            ELSE 0 
        END as correct_prediction
    FROM customer_voice_dataset
    WHERE predicted_sentiment IS NOT NULL
)
SELECT 
    COUNT(*) as total_predictions,
    SUM(correct_prediction) as correct_predictions,
    SUM(correct_prediction) * 100.0 / COUNT(*) as accuracy_rate,
    AVG(sentiment_score) as avg_confidence_score,
    -- Precision for each sentiment class
    SUM(CASE WHEN actual_sentiment = 'positive' AND predicted_sentiment = 'positive' THEN 1 ELSE 0 END) * 1.0 /
    NULLIF(SUM(CASE WHEN predicted_sentiment = 'positive' THEN 1 ELSE 0 END), 0) as positive_precision,
    
    SUM(CASE WHEN actual_sentiment = 'negative' AND predicted_sentiment = 'negative' THEN 1 ELSE 0 END) * 1.0 /
    NULLIF(SUM(CASE WHEN predicted_sentiment = 'negative' THEN 1 ELSE 0 END), 0) as negative_precision,
    
    SUM(CASE WHEN actual_sentiment = 'neutral' AND predicted_sentiment = 'neutral' THEN 1 ELSE 0 END) * 1.0 /
    NULLIF(SUM(CASE WHEN predicted_sentiment = 'neutral' THEN 1 ELSE 0 END), 0) as neutral_precision
FROM sentiment_predictions;

-- 9. Business Impact Analysis - Feature Adoption and Churn Correlation
SELECT 
    category,
    COUNT(*) as feedback_volume,
    AVG(sentiment_score) as category_sentiment,
    COUNT(CASE WHEN feature_implemented = 'yes' THEN 1 END) as features_implemented,
    COUNT(CASE WHEN feature_implemented = 'yes' THEN 1 END) * 100.0 / COUNT(*) as implementation_rate,
    AVG(CASE WHEN feature_implemented = 'yes' THEN post_implementation_satisfaction END) as post_impl_satisfaction,
    COUNT(CASE WHEN user_churned = 'no' AND feature_implemented = 'yes' THEN 1 END) as retained_users_post_impl
FROM customer_voice_dataset
WHERE category IN ('feature_request', 'usability', 'performance', 'bug_report')
GROUP BY category
ORDER BY feedback_volume DESC;

-- 10. Advanced Analytics - Cohort Analysis and Retention
WITH user_cohorts AS (
    SELECT 
        user_id,
        DATE_TRUNC('month', MIN(timestamp)) as cohort_month,
        COUNT(*) as total_feedback,
        AVG(sentiment_score) as user_sentiment_trend
    FROM customer_voice_dataset
    GROUP BY user_id
),
monthly_activity AS (
    SELECT 
        uc.cohort_month,
        DATE_TRUNC('month', cvd.timestamp) as activity_month,
        COUNT(DISTINCT cvd.user_id) as active_users
    FROM user_cohorts uc
    JOIN customer_voice_dataset cvd ON uc.user_id = cvd.user_id
    GROUP BY uc.cohort_month, DATE_TRUNC('month', cvd.timestamp)
)
SELECT 
    cohort_month,
    activity_month,
    active_users,
    EXTRACT(MONTH FROM AGE(activity_month, cohort_month)) as months_since_first_feedback,
    active_users * 100.0 / FIRST_VALUE(active_users) OVER (
        PARTITION BY cohort_month 
        ORDER BY activity_month 
        ROWS UNBOUNDED PRECEDING
    ) as retention_rate
FROM monthly_activity
ORDER BY cohort_month, activity_month;

-- 11. Topic Modeling Results Analysis (if topic data available)
SELECT 
    topic_id,
    topic_name,
    COUNT(*) as documents_in_topic,
    AVG(topic_probability) as avg_topic_probability,
    AVG(sentiment_score) as topic_sentiment,
    COUNT(CASE WHEN priority IN ('critical', 'high') THEN 1 END) as high_priority_in_topic,
    STRING_AGG(DISTINCT category, ', ') as related_categories
FROM customer_voice_dataset cvd
JOIN topic_assignments ta ON cvd.feedback_id = ta.feedback_id
WHERE ta.topic_probability > 0.3
GROUP BY topic_id, topic_name
ORDER BY documents_in_topic DESC;
