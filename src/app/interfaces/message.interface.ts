export interface Message {
    login: {
        successNotification: {};
        failNotification: {
            ApplyCredentials: string;
            IncorrentCrentials: string;
        };
    };
    plan: {
        successNotification: {
            CreatePlan: string;
            SelectedPlan: string;
            UnSelectedPlan: string;
            PlanSchedualed: string;
        };
        failNotification: {
            SchedualPlan: string;
            FailToSavePlan: string;
            AddExercise: string;
            ErrorCreatingPlan: string;
            NecessaryToAddPlan: string;
        };
    };
    exercise: {
        successNotification: {
            TheExercisesWereAdded: string;
        };
        failNotification: {
            PleaseSelectAnExercise: string;
        };
    };
}
