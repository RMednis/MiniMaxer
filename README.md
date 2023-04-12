# Office Politics
_The only game where you have to fight to not get fired... with an AI :D_

## Story
Your boss has been mad at your team for overspending their budget during the last year, so much so
that they cut your teams size to just 2 employees... you and D(AI)ve.
They have given your team a very strict budget for a new software development project,
and considering how many cuts have happened last time, you're pretty sure your head is next on the chopping block if you go over the budget.

You and D(AI)ve are both asked to manage the engineering teams this year, you have 3 levels of engineers:
    - Senior engineers, that cost 13 euros an hour
    - Junior engineers, that cost 6 euros an hour
    - Interns, that cost 3 euros an hour

They are all contractors you can pull in from other teams for an hour, and you know that the budget is not going to be enough for the scale of the project,
so your only choice is to throw D(ai)ve under the bus... It's fine... You're pretty sure he's just one of those new fancy AI models anyway.

You and D(ai)ve swap places every hour, since your team can only have one extra employee at a time.
If you land on 0, neither of you are getting fired.
Otherwise whoever is the one to go under first, loses!

## Manager Mode
The settings cog also let's you select who goes first, and what the starting budget is!

### Algorithms

In the settings cog you can change the algorithm type _(Default is MiniMax with AB pruning)_
There are 3 algorithms available:
 - **Random** - Just picks a random option (Suprisingly hard to beat xD)
 - **MiniMax** - Basic minimax implementation with a maximum of 5 levels depth**
 - **MiniMax (AB)** - Minimax with Alpha Beta Pruning (Can handle as many as the recursion limit on Chrome's V8 JS engine allows)

The general algorithms are very simple in nature and can be quite slow on lower spec devices _(This is JavaScript after all xD)_

** _More causes the browser to lag... it's `O(log(n))` but space increses as a factor of 3 every level_


_Made with <3 by Mednis, 2023_