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
        largestDropPercentage: 0, 
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

        this.strategyService.createStrategy(this.strategy).subscribe({
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


}