# docactive
Interactive HTML documents made with Rmd and badly written JS

Install {docactive} from github using {devtools}

```{r}
devtools::install_github("annafergusson/docactive")
```

Then open up RStudio and create a new Rmd using the *From Template* option.

Choose Interactive HTML document {docactive}.

This will give you some starter examples of the current ways to markup text. 

Alternatively, if you already have a Rmd doc you want to make interactive, change the YAML to use the docactive template.

```
---
title: "Interactive fun times"
output: docactive::docactive
---
```

The {docactive} template is just the `html_document` template, with added `css` and `js` for the interactive stuff. At the moment, there's no functionality to use {docactive} with other templates nor to add the interactivity with `R` code.