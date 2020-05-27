![Demo](demo.gif)

## What is this?
This is an attempt at creating a democratized, open-source website that does fact checking.

[This project's API](https://app.swaggerhub.com/apis-docs/Ferretech/lens-of-truth-api/1.0.0/) conforms to the OpenAPI standard and is automatically documented.

## What about existing fact-checkers?
There are already some well-known fact-checkers out there, but none are perfect.

### Problems with existing fact-checkers:

- **They are slow**

    Misinformation spreads like wildfire, and we can't always wait for the experts to discover it and write up a full 
    rebuttal.

- **They aren't adaptive**

    What happens when a source is discovered to be untrustworthy? When an expert becomes discredited? When a scientific
    study is overturned? When fact judgements need to reevaluated, this should be discovered automatically. Modern 
    technology can do far better than the word-of-mouth system that still seems to rule journalism and academia.

- **They are avoidable by people with fringe opinions**

    Existing fact checkers may actually do very little to change people's minds. Let's get these people involved in the 
    conversation and introduce them to the tools for real skepticism by allowing them to provide context for their 
    opinions.

- **They are easily written off as elitist**

    Linking somebody to Snopes is a great way to destroy a friendship. Fact-checkers should initiate conversations, not 
    stifle them.

- **They are Anglocentric**

    Existing fact-checkers primarily provide content in English and focus heavily on US politics. The open source 
    community at large can do better to provide information to a wider demographic.


### Things existing fact-checkers got right:

- **They provide sources**
    
    Skeptics need to be allowed to investigate claims for themselves.

- **They are transparent**
    
    Without the guise of anonymity, fact-checkers require experts to stake their reputations on their fact judgements.

- **They rely on experts**

    We still need the guidance of experts to navigate nuanced and complex topics, and provide a summary for laypeople.

- **They aren't able to be manipulated**

    A 'democratic' approach to fact-checking must not itself be susceptible to propaganda and misinformation.


## So how's this going to work?

Imagine the following scenario: a high-profile politician tweets out a claim. A short while later, person A links the 
tweet on this website as a **claim**. Shortly after that, person B reads the claim and remembers that they saw a study 
that seemed to disprove this claim. So, they link that source to the claim as **evidence** and submit it as 
**disproving** the claim. This study is now publically linked as **context** to the claim, but remains flagged as 
**unverified**. A while after that, a user marked as an expert in this field finds the unverified evidence, and reads 
the study. While the study disputes the claim, the expert is not convinced it disproves the claim. The expert sends 
feedback on the evidence to person B with the revision that the evidence only disputes, not disproves the claim. Person 
B accepts these changes, and now the claim is marked as **disputed** by the verified evidence.


## Some model projects
This project could take inspiration from some of the best of the web.

#### [Wikipedia](https://wikipedia.org)
Wikipedia provides a democratic approach to editing that would be very apt here.

#### [StackExchange](https://stackexchange.com)
StackExchange organically attracts experts into conversations with laypeople on a very wide variety of topics.

#### [Quora](https://quora.com)
Quora seems to do an even better job of organically attracting experts, but the quality of information here can vary 
wildly.
