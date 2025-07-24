import { CommonModule } from "@angular/common";
import { booleanAttribute, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StrategyService } from "../../services/strategy.service";
import { Strategy, RiskLevel } from "../../models/strategy.model";
import { Router } from "@angular/router";


@Component({
    selector: 'app-create-strategy',
    standalone: true, 
    templateUrl: './create-strategy.component.html', 
    styleUrls: ['./create-strategy.component.css'], 
    imports: [CommonModule, FormsModule]
})

export class CreateStrategyComponent implements OnInit {
    strategy: Strategy = {
        _id: '', 
        name: '', 
        description: '', 
        riskLevel: 'low', 
        avgProfitPercentage: 0, 
        largestDropPercentage: 0
     };

     historicalData = {
        bestYear: null as number | null,
        worstYear: null as number | null,
        yearsActive: null as number | null
     }; 

     isLoading = false; 
     errorMessage = ''; 
     successMessage = '';

     constructor(
        private strategyService: StrategyService, 
        private router: Router 
     ){}

    ngOnInit(): void {

        
    }

    createStrategy(name: string, description: string, riskLevel: RiskLevel, avgProfitPercentage: number, largestDropPercentage: number, 
        historicalData?:{
            bestYear: number;
            worstYear: number;
            yearsActive: number;
        }
    ) {

        this.strategy = {
            _id: '', 
            name: name, 
            description: description, 
            riskLevel: riskLevel, 
            avgProfitPercentage: avgProfitPercentage, 
            largestDropPercentage: largestDropPercentage, 
            historicalData: historicalData
        }; 

    }
   // Alternative: If you're using form binding, you might want this simpler method
    onSubmit() {
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';

        // Prepare strategy data for backend
        const strategyToSubmit = { ...this.strategy };
        
        // Only include historicalData if at least one field has a value
        const hasHistoricalData = this.historicalData.bestYear !== null || 
                                 this.historicalData.worstYear !== null || 
                                 this.historicalData.yearsActive !== null;
        
        if (hasHistoricalData) {
            strategyToSubmit.historicalData = {
                bestYear: this.historicalData.bestYear || 0,
                worstYear: this.historicalData.worstYear || 0,
                yearsActive: this.historicalData.yearsActive || 0
            };
        }

        this.strategyService.createStrategy(strategyToSubmit).subscribe({
            next: (createdStrategy) => {
                console.log('Strategy created successfully:', createdStrategy);
                this.successMessage = 'Strategy created successfully!';
                this.isLoading = false;
                setTimeout(() => {
                    this.router.navigate(['/strategies']); 
                }, 1500);
            },
            error: (error) => {
                console.error('Error creating strategy:', error);
                this.errorMessage = error.error?.error || 'Failed to create strategy. Please try again.';
                this.isLoading = false;
            }
        });
    }

    goBack() {
        this.router.navigate(['/strategies']);
    }


}