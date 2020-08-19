
docactive <- function(...) {

  extra_dependencies <- list(
    htmltools::htmlDependency(
      name = "docactive-format",
      version = utils::packageVersion("docactive"),
      src = system.file("rmarkdown/templates/docactive/resources",
                        package = "docactive"),
      script = "docactive-format.js",
      stylesheet = "docactive-format.css"
    )
  )

  rmarkdown::html_document(
    extra_dependencies = extra_dependencies,
    bootstrap_compatible = TRUE,
    ...
  )
}
