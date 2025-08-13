import pandas as pd
import numpy as np
import json
from urllib.request import urlopen

def fetch_and_analyze_datasets():
    """Fetch and analyze the real credit scoring datasets"""
    
    # Dataset URLs
    summary_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dataset_summary_statistics-6wmbaGQB1g81o2kK26RMgS89PXfIPe.csv"
    complete_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sme_credit_scoring_complete_dataset-ikMc3UGCZJ0PH2MAwkPYJRkixoJ3QR.csv"
    
    print("📊 Fetching and analyzing real credit scoring datasets...")
    
    try:
        # Load the complete dataset
        print("Loading complete dataset...")
        df_complete = pd.read_csv(complete_url)
        
        # Load summary statistics
        print("Loading summary statistics...")
        df_summary = pd.read_csv(summary_url)
        
        print(f"✅ Complete dataset loaded: {len(df_complete)} records")
        print(f"✅ Summary statistics loaded: {len(df_summary)} features")
        
        # Analyze key patterns
        analysis = {
            "dataset_size": len(df_complete),
            "business_types": df_complete['business_type'].value_counts().to_dict(),
            "gender_distribution": df_complete['owner_gender'].value_counts().to_dict(),
            "location_distribution": df_complete['location_type'].value_counts().to_dict(),
            "approval_rates": {
                "traditional": df_complete['traditional_approval'].mean(),
                "ai": df_complete['ai_approval'].mean(),
                "actually_creditworthy": df_complete['actually_creditworthy'].mean()
            },
            "feature_ranges": {
                "years_in_business": {
                    "min": float(df_complete['years_in_business'].min()),
                    "max": float(df_complete['years_in_business'].max()),
                    "mean": float(df_complete['years_in_business'].mean())
                },
                "monthly_revenue": {
                    "min": float(df_complete['monthly_revenue'].min()),
                    "max": float(df_complete['monthly_revenue'].max()),
                    "mean": float(df_complete['monthly_revenue'].mean())
                },
                "mobile_money_frequency": {
                    "min": float(df_complete['mobile_money_frequency'].min()),
                    "max": float(df_complete['mobile_money_frequency'].max()),
                    "mean": float(df_complete['mobile_money_frequency'].mean())
                }
            },
            "score_correlations": {
                "mobile_money_score_mean": float(df_complete['mobile_money_score'].mean()),
                "business_score_mean": float(df_complete['business_score'].mean()),
                "credit_score_mean": float(df_complete['credit_score'].mean()),
                "traditional_score_mean": float(df_complete['traditional_score'].mean())
            }
        }
        
        # Analyze bias patterns
        print("\n🔍 Analyzing bias patterns...")
        
        # Gender bias analysis
        female_businesses = df_complete[df_complete['owner_gender'] == 'female']
        male_businesses = df_complete[df_complete['owner_gender'] == 'male']
        
        gender_bias = {
            "female_traditional_approval": float(female_businesses['traditional_approval'].mean()),
            "male_traditional_approval": float(male_businesses['traditional_approval'].mean()),
            "female_ai_approval": float(female_businesses['ai_approval'].mean()),
            "male_ai_approval": float(male_businesses['ai_approval'].mean()),
            "female_actually_creditworthy": float(female_businesses['actually_creditworthy'].mean()),
            "male_actually_creditworthy": float(male_businesses['actually_creditworthy'].mean())
        }
        
        # Location bias analysis
        rural_businesses = df_complete[df_complete['location_type'] == 'rural']
        urban_businesses = df_complete[df_complete['location_type'] == 'urban']
        
        location_bias = {
            "rural_traditional_approval": float(rural_businesses['traditional_approval'].mean()),
            "urban_traditional_approval": float(urban_businesses['traditional_approval'].mean()),
            "rural_ai_approval": float(rural_businesses['ai_approval'].mean()),
            "urban_ai_approval": float(urban_businesses['ai_approval'].mean()),
            "rural_actually_creditworthy": float(rural_businesses['actually_creditworthy'].mean()),
            "urban_actually_creditworthy": float(urban_businesses['actually_creditworthy'].mean())
        }
        
        analysis["gender_bias"] = gender_bias
        analysis["location_bias"] = location_bias
        
        # Sample realistic businesses for demo
        sample_businesses = []
        for _, row in df_complete.sample(10).iterrows():
            sample_businesses.append({
                "business_id": row['business_id'],
                "business_type": row['business_type'],
                "owner_gender": row['owner_gender'],
                "location_type": row['location_type'],
                "years_in_business": float(row['years_in_business']),
                "monthly_revenue": float(row['monthly_revenue']),
                "mobile_money_frequency": float(row['mobile_money_frequency']),
                "mobile_money_score": float(row['mobile_money_score']),
                "business_score": float(row['business_score']),
                "credit_score": float(row['credit_score']),
                "traditional_approval": int(row['traditional_approval']),
                "ai_approval": int(row['ai_approval']),
                "actually_creditworthy": int(row['actually_creditworthy'])
            })
        
        analysis["sample_businesses"] = sample_businesses
        
        print("\n📈 Analysis Results:")
        print(f"Traditional approval rate: {analysis['approval_rates']['traditional']:.1%}")
        print(f"AI approval rate: {analysis['approval_rates']['ai']:.1%}")
        print(f"Actually creditworthy: {analysis['approval_rates']['actually_creditworthy']:.1%}")
        
        print(f"\nGender bias in traditional model:")
        print(f"Female approval rate: {gender_bias['female_traditional_approval']:.1%}")
        print(f"Male approval rate: {gender_bias['male_traditional_approval']:.1%}")
        print(f"Female actually creditworthy: {gender_bias['female_actually_creditworthy']:.1%}")
        
        print(f"\nLocation bias in traditional model:")
        print(f"Rural approval rate: {location_bias['rural_traditional_approval']:.1%}")
        print(f"Urban approval rate: {location_bias['urban_traditional_approval']:.1%}")
        
        # Save analysis results
        with open('real_data_analysis.json', 'w') as f:
            json.dump(analysis, f, indent=2)
        
        print("\n✅ Analysis complete! Results saved to real_data_analysis.json")
        return analysis
        
    except Exception as e:
        print(f"❌ Error analyzing datasets: {e}")
        return None

if __name__ == "__main__":
    analysis = fetch_and_analyze_datasets()
