# M.I.N.D.

## MENTAL INTERPRETATION NETWORK FOR DECISION-MAKING

## THE PROBLEM
More than 60 million people globally have limb loss, with 1 million people adding to the numbers annually. Yet just 1 in 10 people worldwide who require assistive technology currently have it available to them, and it is reported that as many as 95% of amputees in developing countries are provided with no prosthetic care at all. One powerful solution could lie in a brain-computer interface to restore motor control. Still, currently, BCIs are limited to relying on one individual classifier, which are fragile between people, as a BCI trained for one person's EEG patterns likely won't work for someone else and therefore, are excluding those that may need it the most: those with most unusual brain patterns, those with the least access to care, and those who are financially unable to afford sufficient medical treatment.

## OUR SOLUTION
The ensemble M.I.N.D. uses takes the average of the probability output of three classifiers, weighted soft-voting. Each classifier weight is determined by its own accuracy, verified by cross-validation. Instead of deciding on one of the base classifiers, M.I.N.D. combines decision boundaries from several different but complementary classifiers to create an averaged decision boundary, which yields a better average classification and is more resistant to variations that are caused by the diversity of brain responses of individual users. Besides classification accuracy, the M.I.N.D. classifier uses a confidence gate and a debouncer where decisions must be both reasonably confident and stable over time (many consecutive decisions) in order to execute a command, and any low confidence or unstable signal would be filtered.

## OUR HYPOTHESES

## PIPELINE

### H1 - ACCURACY
A weighted soft-voting ensemble of SVM, Random Forest, and LDA trained on CSP features will achieve a statistically significantly higher mean 4-class accuracy than any individual classifier. (Matched-pairs t-test, alpha = 0.025 Bonferroni corrected)

### H2 - STABILITY
The ensemble will produce a significantly lower standard deviation of accuracy across subjects — including atypical users currently failed by single-model systems.

## DATASET
BCI Competition IV (Dataset 2a) & BCI Competition III (Dataset IIIa) are publicly available benchmark datasets for motor imagery classification across 9 subjects and 22 EEG channels.

## WHY IT MATTERS
A more stable, precise BCI decoder means that prosthetic systems can now work reliably for a more diverse set of users, including those with atypical neural signals. M.I.N.D. is designed to bridge the gap between lab-approved BCIs and deployment in real-world circumstances.
