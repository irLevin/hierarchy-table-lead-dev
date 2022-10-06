# hierarchy-table-lead-dev
What do you think about the overall structure of this component?

From my point of view this component should be splitted to the smallest components, such as: Parent Component as is (HierarchyTable), TableHeader, TableRow according to the Single Responsibility Principle. Also I would prefer atomic reusable components such as buttons. In case more wide components with more complex logic maybe to split component according to MVC patter in order to improve readability and maintaince of the code.

Do you see any broken features, bugs or deficits? How would you fix them?
for instance in case the row is expandable - the icon should be shown, otherwise - not, because it confuses the user, not good for user expirience (fixed)
delete function (the task itself) - missing update function that will check if the object does not have "kids" we dont need to show it, also object data should be defined correctly in the controller (ts) in order reactivly update object according to the store. (fixed)

What would be the most valuable improvements ?
1. introducing additional models(types/interfaces depends) that will cover data objects. Also for Table sub-components: TableProps, TableHeaders
2. Overall project structure, for example: main views (folder pages), components common for use (folder shared/partials, for more smallest components folder atoms)
3. Personally, I prefer to use store as much as possible, less dependency in transmitting props and fire events, based on expirience such behaviour saves a lot of time when project structure is complex and "depth" components is not 1 to emit event to "grand-grand-father" component is very complicated and could be a reason many issues.

What’s missing to have the component production ready?\
1) testing - tests and script to run tests
2) eslint/prettier check on pre-commit with husky
3) remove envirionment variables from the project according to 12 devops rules they should be rendered independenlty from code base
4) run build script that will create dist folder - ready to deploy

Is there any framework, library, tools that you know would greatly benefit this app
and/or development ?

1) material library such as vuetify (available almost for vue 3) or buefy/bootsrap to save time for creating common controls
2) of course will be required axios 
3) found that vue-property-decorator and vuex-module-decorators are very useful at least for vue 2, for vue 3 there is another package vue-facing-decorator
4) configure debugger for debugging within VC IDE 
