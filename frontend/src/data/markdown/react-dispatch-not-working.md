At times, you may notice that your redux actions are not getting dispatched. You've looked at the code and everything seems fine. So what could be the problem? There could be several issues but I'll focus on two that I recently encountered:

1. Make sure that the different actiontypes constants i.e `pending, fullfiled, rejected` in reduxTK are properly spelled. 

2. Look at the backend api serializer and identify whether the actual payload (data that you want) is nested in another property eg.. results. This would mean that a successful dispatch i.e `action.Fullfiled` calls the right property eg `payload.results`