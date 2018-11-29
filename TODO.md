# TODO List for DigiBooks project

## Bugs

  * when list is filtered to "Uncategorised only", changing the category using the dropdown confuses the items left on the spot where the item was set
  * Debit categories are allowed to be assigned to credit transactons?
  * Alert for applying category to selected transactions shows incorrect count - not only selected but all filtered transactions
- - -

## Features and Improvements

 ### Higher Priority

  * Implement simple file Load and Save until project is integrated wiht rails and database
  * Implement messages on the sidebar after each action
  * Implement "open file" dialog for importing csv file 
  * Implement filter to show only selected category (or mayby multiple categories?)
  * Nicer category titles to be displayed in the summary table
  * CSV import - allow appending but avoid doubling up transactions  
  * Implement id field when importing transactions



  >* __Integrate wiht rails and database__


### Lower Priority

  * Implement filtering by date
  * Implement table sorting
  * Description search using RegEx - e.g. two different words separated by space to be found anywhere in the description
  * Implement Auto rules, via RegEX or more readable rules to batch apply to set of transactions
  * Work out the structure to have customizable categories without affecting the ones already set
  * Introduce some checks to avoid user errors (like assignin credit transacton to debit type of category)
 

- - -
## Minor Changes

  - ~~Summary table - show blank space instead of 0.00~~

- - -

## Major Changes

  * Ability to manually enter transactions on top of the imported ones, way to track cash expenses
  * Ability to provide additional details, even for imported transactions, including maybe scanned receipt
  * Invesigate directly importing transactions from commonwealth bank
  * Make the application mobile-friendly (do we really need to? or maybe some parts of it in the future, like adding expenses on the go)


- - -

## Investigate

  * Invesigate directly importing transactions from commonwealth bank
  * Pagination tables in Vue e.g:
    * Vuetiful: [https://codepen.io/andrewcourtice/full/woQzpa]
    * DataTables: [https://datatables.net/]
    * [https://vuejsexamples.com/tag/datatable/]
  * CSV parsing and saving 
    * [https://www.papaparse.com/]
  * Debugging with Visual Code
    * [https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome]
    * [https://github.com/Microsoft/vscode-recipes]

# Done

* ~~Implement printing~~
* ~~Currency format wherever amounts are displayed~~
* ~~Summary table - right align credits and debits~~