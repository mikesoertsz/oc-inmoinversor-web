## [](https://developers.notion.com/docs/working-with-databases#overview)

[Databases](https://www.notion.so/help/intro-to-databases) are containers for one or more [data sources](https://developers.notion.com/reference/data-source), each of which is a collection of [pages](https://developers.notion.com/reference/page) in a Notion workspace. Data sources can be filtered, sorted, and organized as needed. They allow users to create and manipulate structured data in Notion.

Integrations can be used to help users sync databases with external systems or build workflows around Notion databases.

In this guide, you'll learn:

- [How databases and data sources are represented in the API](https://developers.notion.com/docs/working-with-databases#structure).
- [How to add items to a data source](https://developers.notion.com/docs/working-with-databases#adding-pages-to-a-data-source).
- [How to find items within data sources](https://developers.notion.com/docs/working-with-databases#finding-pages-in-a-data%20source).

###

Additional types of databases

[](https://developers.notion.com/docs/working-with-databases#additional-types-of-databases)

In addition to regular Notion databases, there are two other types of databases & data sources to be aware of. _However, neither of these database types are currently supported by Notion's API._

#### [](https://developers.notion.com/docs/working-with-databases#linked-data-sources)

Notion offers [linked data sources](https://www.notion.so/help/guides/using-linked-databases) as a way of showing a data source in multiple places. You can identify them by a ↗ next to the data source title which, when clicked, takes you to the original data source.

![Linked databases are indicated with an arrow next to the name.](https://files.readme.io/b551e28-linkeddb.png)

Linked databases are indicated with an arrow next to the name.

> ## 🚧
>
> Notion's API does not currently support linked data sources. When sharing a database with your integration, make sure it contains the original data source!

#### [](https://developers.notion.com/docs/working-with-databases#wiki-databases)

Wiki databases are a special category of databases that allow [Workspace Owners](https://www.notion.so/help/add-members-admins-guests-and-groups) to organize child pages and databases with a homepage view. Wiki database pages can be verified by the Workspace Owner with an optional expiration date for the verification.

Pages in a wiki database will have a [`verification`](https://developers.notion.com/reference/page-property-values#verification) property that can be set through your Notion workspace. See directions for [creating wikis](https://www.notion.so/help/wikis-and-verified-pages#create-a-wiki) and [verifying pages](https://www.notion.so/help/wikis-and-verified-pages#verifying-pages) in our Help Center.

Wiki databases can currently only be created through your Notion workspace directly (i.e., not Notion's API). Ability to retrieve wiki databases in the API may be limited, and you can't add multiple data sources to a wiki database.

To learn more about creating and working with wiki databases, see the following Help Center articles:

- [Wikis and verified pages](https://www.notion.so/help/wikis-and-verified-pages)
- [Wiki guides](https://www.notion.so/help/guides/category/wiki)

## [](https://developers.notion.com/docs/working-with-databases#structure)

Database objects, and their data source children, describe a part of what a user sees in Notion when they open a database. See our [documentation on database objects](https://developers.notion.com/reference/database), [data source objects](https://developers.notion.com/reference/data-source), and [data source properties](https://developers.notion.com/reference/property-object) for a complete description.

Databases contain a list of data sources (IDs and names). In turn, each data source can be retrieved and managed separately and acts as the parent for pages (rows of data) that live under them.

```
<p>{
  <span>"object"</span>: <span>"database"</span>,
  <span>"id"</span>: <span>"248104cd-477e-80fd-b757-e945d38000bd"</span>,
  <span>"title"</span>: [
    {
      <span>"type"</span>: <span>"text"</span>,
      <span>"text"</span>: {
        <span>"content"</span>: <span>"Grocery DB"</span>,
        <span>// ...</span>
      },
      <span>// ...</span>
    }
  ],
  <span>"parent"</span>: {
    <span>"type"</span>: <span>"page_id"</span>,
    <span>"page_id"</span>: <span>"255104cd-477e-808c-b279-d39ab803a7d2"</span>
  },
  <span>"is_inline"</span>: <span>false</span>,
  <span>"in_trash"</span>: <span>false</span>,
  <span>"created_time"</span>: <span>"2025-08-07T10:11:07.504-07:00"</span>,
  <span>"last_edited_time"</span>: <span>"2025-08-10T15:53:11.386-07:00"</span>,
  <span>"data_sources"</span>: [
    {
      <span>"id"</span>: <span>"248104cd-477e-80af-bc30-000bd28de8f9"</span>,
      <span>"name"</span>: <span>"Grocery list"</span>
    }
  ],
  <span>"url"</span>: <span>"https://www.notion.so/example/248104cd477e80fdb757e945d38000bd"</span>,
  <span>"icon"</span>: <span>null</span>,
  <span>"cover"</span>: {
    <span>"type"</span>: <span>"external"</span>,
    <span>"external"</span>: {
      <span>"url"</span>: <span>"https://website.domain/images/image.png"</span>
    }
  },
}
</p>
```

The most important part is the data source's schema, defined in the `properties` object.

> ## 📘
>
> Terminology
>
> The **columns** of a Notion data source are referred to as its "**properties**" or "**schema**".
>
> The **rows** of a data source are individual [Page](https://developers.notion.com/reference/page)s that live under it and each contain page properties (keys and values that conform to the data source's schema) and content (what you see in the body of the page in the Notion app).

> ## 🚧
>
> Maximum schema size recommendation
>
> Notion recommends a maximum schema size of **50KB**. Updates to database schemas that are too large will be blocked to help maintain database performance.

### [](https://developers.notion.com/docs/working-with-databases#data-source-properties)

![Example of a database with three properties (Grocery item, Price, Last ordered).](https://files.readme.io/6a2c69a-databaseproperties.png)

Example of a data source with three properties (Grocery item, Price, Last ordered).

Let's assume you're viewing a data source as a table. The columns of the data source are represented in the API by database [property objects](https://developers.notion.com/reference/property-object). Property objects store a description of a column, including a type for the allowable values that can go into a column.

You might recognize a few of the common types:

- [Text](https://developers.notion.com/reference/property-object#rich-text)
- [Numbers](https://developers.notion.com/reference/property-object#number)
- [Dates](https://developers.notion.com/reference/property-object#date)
- [People](https://developers.notion.com/reference/property-object#people)

For each type, additional configuration may also be available. Let's take a look at the `properties` section of an example data source object.

```
<p>{
  <span>"object"</span>: <span>"data_source"</span>,

  <span>"properties"</span>: {
    <span>"Grocery item"</span>: {
      <span>"id"</span>: <span>"fy%3A%7B"</span>, <span>// URL-decoded: fy:{</span>
      <span>"type"</span>: <span>"title"</span>,
      <span>"title"</span>: {}
    },
    <span>"Price"</span>: {
      <span>"id"</span>: <span>"dia%5B"</span>, <span>// URL-decoded: dia[</span>
      <span>"type"</span>: <span>"number"</span>,
      <span>"number"</span>: {
        <span>"format"</span>: <span>"dollar"</span>
      }
    },
    <span>"Last ordered"</span>: {
      <span>"id"</span>: <span>"%5D%5C%5CR%5B"</span>, <span>// URL-decoded: ]\\R[</span>
      <span>"type"</span>: <span>"date"</span>,
      <span>"date"</span>: {}
    },
  }

  <span>// ... remaining fields omitted</span>
}
</p>
```

In this data source object, there are three `properties` defined. Each key is the property name and each value is a property object. Here are some key takeaways:

- **The [`"title"`](https://developers.notion.com/reference/property-object#title) type is special.** Every data source has exactly one property with the `"title"` type. Properties of this type refer to the page title for each item in the database. In this example, the _Grocery item_ property has this type.
- **The value of `type` corresponds to another key in the property object.** Each property object has a nested property named the same as its `type` value. For example, _Last ordered_ has the type `"date"`, and it also has a `date` property. **This pattern is used throughout the Notion API on many objects and we call it type-specific data.**
- **Certain property object types have additional configuration.** In this example, _Price_ has the type `"number"`. [Number property objects](https://developers.notion.com/reference/property-object#number) have additional configuration inside the `number` property. In this example, the `format` configuration is set to `"dollar"` to control the appearance of page property values in this column.

###

Iterate over a data source object

[](https://developers.notion.com/docs/working-with-databases#iterate-over-a-data-source-object)

A request to [Retrieve a data source](https://developers.notion.com/reference/retrieve-a-data-source) returns a [Data source](https://developers.notion.com/reference/data-source) object. You can iterate over the `properties` object in the response to list information about each property. For example:

```
<p><span>Object</span>.<span>entries</span>(<span>dataSource</span>.<span>properties</span>).<span>forEach</span>(([<span>propertyName</span>, <span>propertyValue</span>]) <span>=&gt;</span> {
    <span>console</span>.<span>log</span>(<span>`${</span><span>propertyName</span><span>}: ${</span><span>propertyValue</span>.<span>type</span><span>}`</span>);
});
</p>
```

##

Adding pages to a data source

[](https://developers.notion.com/docs/working-with-databases#adding-pages-to-a-data-source)

Pages are used as items inside a data source, and each page's properties must conform to its parent database's schema. In other words, if you're viewing a data source as a table, a page's properties define all the values in a single row.

> ## 📘
>
> The page properties that are valid depend on the page's parent
>
> If you are [creating a page](https://developers.notion.com/reference/post-page) in a data source, the page properties must match the properties of the database. If you are creating a page that is not a child of a database, `title` is the only property that can be set.

Pages are added to a data source using the [Create a page API endpoint](https://developers.notion.com/reference/post-page). Let's try to add a page to the example data source above.

The [Create a page](https://developers.notion.com/reference/post-page) endpoint has two required parameters: `parent` and `properties`.

When adding a page to a database, the `parent` parameter must be a [data source parent](https://developers.notion.com/reference/parent-object). We can build this object for the example data source above:

```
<p>{
  <span>"type"</span>: <span>"data_source_id"</span>,
  <span>"data_source_id"</span>: <span>"248104cd-477e-80af-bc30-000bd28de8f9"</span>
}
</p>
```

> ## 📘
>
> Permissions
>
> Before an integration can create a page within another page, it needs access to the page parent. To share a page with an integration, click the ••• menu at the top right of a page, scroll to `Add connections`, and use the search bar to find and select the integration from the dropdown list.

> ## 📘
>
> Where can I find my database and data source's IDs?
>
> - Open the database as a full page in Notion.
> - Use the `Share` menu to `Copy link`.
> - Now paste the link in your text editor so you can take a closer look. The URL uses the following format:
>
> ```
> <span data-testid="SyntaxHighlighter">https://www.notion.so/{workspace_name}/{database_id}?v={view_id}
> </span>
> ```
>
> - Find the part that corresponds to `{database_id}` in the URL you pasted. It is a 36 character long string. This value is your **database ID**.
> - Note that when you receive the database ID from the API, e.g. the [search](https://developers.notion.com/reference/post-search) endpoint, it will contain hyphens in the UUIDv4 format. You may use either the hyphenated or un-hyphenated ID when calling the API.
> - To get the **data source ID**, either use the [Retrieve a database](https://developers.notion.com/reference/database-retrieve) endpoint first and check the `data_sources` array, or use the overflow menu under "Manage data sources" to copy it from the Notion app:
>
>   ![](https://files.readme.io/4d48fb5dbd0a0057428d8001852d48b19cbe29449bb8560ce181b0e2d3e0fedf-image.png)

Continuing the create page example above, the `properties` parameter is an object that uses property names or IDs as keys, and [property value objects](https://developers.notion.com/reference/page-property-values) as values. In order to create this parameter correctly, you refer to the [property objects](https://developers.notion.com/reference/property-object) in the database's schema as a blueprint. We can build this object for the example database above too:

```
<p>{
  <span>"Grocery item"</span>: {
    <span>"type"</span>: <span>"title"</span>,
    <span>"title"</span>: [{ <span>"type"</span>: <span>"text"</span>, <span>"text"</span>: { <span>"content"</span>: <span>"Tomatoes"</span> } }]
  },
  <span>"Price"</span>: {
    <span>"type"</span>: <span>"number"</span>,
    <span>"number"</span>: <span>1.49</span>
  },
  <span>"Last ordered"</span>: {
    <span>"type"</span>: <span>"date"</span>,
    <span>"date"</span>: { <span>"start"</span>: <span>"2021-05-11"</span> }
  }
}
</p>
```

> ## 📘
>
> Building a property value object in code
>
> Building the property value object manually, as described in this guide, is only helpful when you're working with one specific database that you know about ahead of time.
>
> In order to build an integration that works with any database a user picks, and to remain flexible as the user's chosen database inevitably changes in the future, use the [Retrieve a database](https://developers.notion.com/reference/database-retrieve) endpoint, followed by [Retrieve a data source](https://developers.notion.com/reference/retrieve-a-data-source). Your integration can call this endpoint to get a current data source schema, and then create the `properties` parameter in code based on that schema.

Using both the `parent` and `properties` parameters, we create a page by sending a request to [the endpoint](https://developers.notion.com/reference/post-page).

```
<p><span>curl</span> <span>-X</span> POST https://api.notion.com/v1/pages \
  <span>-H</span> <span>'Authorization: Bearer '"</span><span>$NOTION_API_KEY</span><span>"''</span> \
  <span>-H</span> <span>"Content-Type: application/json"</span> \
  <span>-H</span> <span>"Notion-Version: <span>2025-09-03</span>"</span> \
  <span>--data</span> <span>'{</span>
<span>  "parent": { "type": "data_source_id", "data_source_id": "248104cd-477e-80af-bc30-000bd28de8f9" },</span>
<span>  "properties": {</span>
<span>      "Grocery item": {</span>
<span>        "type": "title",</span>
<span>        "title": [{ "type": "text", "text": { "content": "Tomatoes" } }]</span>
<span>      },</span>
<span>      "Price": {</span>
<span>        "type": "number",</span>
<span>        "number": 1.49</span>
<span>      },</span>
<span>      "Last ordered": {</span>
<span>        "type": "date",</span>
<span>        "date": { "start": "2021-05-11" }</span>
<span>      }</span>
<span>    }</span>
<span>  }'</span>
</p>
```

Once the page is added, you'll receive a response containing the new [page object](https://developers.notion.com/reference/page). An important property in the response is the page ID (`id`). If you're connecting Notion to an external system, it's a good idea to store the page ID. If you want to update the page properties later, you can use the ID with the [Update page properties](https://developers.notion.com/reference/patch-page) endpoint.

> ## 👍
>
> Using a template
>
> When creating a page in the API, instead of populating the content manually, you can specify a data source template to apply.
>
> Learn more about [database templates](https://www.notion.com/help/database-templates) in our Help Center, and then refer to the [Creating pages from templates](https://developers.notion.com/docs/creating-pages-from-templates) developer guide to get started.

##

Finding pages in a data source

[](https://developers.notion.com/docs/working-with-databases#finding-pages-in-a-data-source)

Pages can be read from a data source using the [Query a data source](https://developers.notion.com/reference/query-a-data-source) endpoint. This endpoint allows you to find pages based on criteria such as "which page has the most recent _Last ordered date_". Some data sources are very large and this endpoint also allows you to get the results in a specific order, and get the results in smaller batches.

> ## 📘
>
> Getting a specific page
>
> If you're looking for one specific page and already have its page ID, you don't need to query a database to find it. Instead, use the [Retrieve a page](https://developers.notion.com/reference/retrieve-a-page) endpoint.

###

Filtering data source pages

[](https://developers.notion.com/docs/working-with-databases#filtering-data-source-pages)

The criteria used to find pages are called [filters](https://developers.notion.com/reference/post-database-query-filter). Filters can describe simple conditions (i.e. "_Tag_ includes _Urgent_") or more complex conditions (i.e. "_Tag_ includes _Urgent_ AND _Due date_ is within the next week AND _Assignee_ equals _Cassandra Vasquez_"). These complex conditions are called [compound filters](https://developers.notion.com/reference/post-database-query#compound-filters) because they use "and" or "or" to join multiple single property conditions together.

> ## 📘
>
> Finding all pages in a data source
>
> In order to find all the pages in a data source, send a request to the [query a database](https://developers.notion.com/reference/post-database-query) without a `filter` parameter.

In this guide, let's focus on a single property condition using the example data source above. Looking at the data source schema, we know the _Last ordered_ property uses the type `"date"`. This means we can build a filter for the _Last ordered_ property using any [condition for the `"date"` type](https://developers.notion.com/reference/filter-data-source-entries#date). The following filter object matches pages where the _Last ordered_ date is in the past week:

```
<p>{
  <span>"property"</span>: <span>"Last ordered"</span>,
  <span>"date"</span>: {
    <span>"past_week"</span>: {}
  }
}
</p>
```

Using this filter, we can find all the pages in the example database that match the condition.

```
<p><span>curl</span> <span>-X</span> POST https://api.notion.com/v1/data_sources/248104cd477e80afbc30000bd28de8f9/query \
  <span>-H</span> <span>'Authorization: Bearer '"</span><span>$NOTION_API_KEY</span><span>"''</span>
  <span>-H</span> <span>"Content-Type: application/json"</span> \
  <span>-H</span> <span>"Notion-Version: <span>2025-09-03</span>"</span> \
<span>--data</span> <span>'{</span>
<span>  "filter": {</span>
<span>      "property": "Last ordered",</span>
<span>      "date": {</span>
<span>        "past_week": {}</span>
<span>      }</span>
<span>}</span>
<span>}'</span>
</p>
```

You'll receive a response that contains a list of matching [page objects](https://developers.notion.com/reference/page).

```
<p>{
  <span>"object"</span>: <span>"list"</span>,
  <span>"results"</span>: [
    {
      <span>"object"</span>: <span>"page"</span>,
      <span>/* details omitted */</span>
    }
  ],
  <span>"has_more"</span>: <span>false</span>,
  <span>"next_cursor"</span>: <span>null</span>
}
</p>
```

This is a paginated response. Paginated responses are used throughout the Notion API when returning a potentially large list of objects. The maximum number of results in one paginated response is 100. The [pagination reference](https://developers.notion.com/reference/pagination) explains how to use the `"start_cursor"` and `"page_size"` parameters to get more than 100 results.

###

Sorting data source pages

[](https://developers.notion.com/docs/working-with-databases#sorting-data-source-pages)

In this case, the individual pages we requested are in the `"results"` array. What if our integration (or its users) cared most about pages that were created recently? It would be helpful if the results were ordered so that the most recently created page was first, especially if the results didn't fit into one paginated response.

The `sort` parameter is used to order results by individual properties or by timestamps. This parameter can be assigned an array of sort object.

The time which a page was created is not a page property (properties that conform to the data source schema). Instead, it's a property that every page has, and it's one of two kinds of timestamps. It is called the `"created_time"` timestamp. Let's build a [sort object](https://developers.notion.com/reference/post-database-query-sort) that orders results so the most recently created page is first:

```
<p>{
  <span>"timestamp"</span>: <span>"created_time"</span>,
  <span>"direction"</span>: <span>"descending"</span>
}
</p>
```

Finally, let's update the request we made earlier to order the page results using this sort object:

```
<p><span>curl</span> <span>-X</span> POST https://api.notion.com/v1/data_sources/248104cd477e80afbc30000bd28de8f9/query \
  <span>-H</span> <span>'Authorization: Bearer '"</span><span>$NOTION_API_KEY</span><span>"''</span>
  <span>-H</span> <span>"Content-Type: application/json"</span> \
  <span>-H</span> <span>"Notion-Version: <span>2025-09-03</span>"</span> \
<span>--data</span> <span>'{</span>
<span>  "filter": {</span>
<span>      "property": "Last ordered",</span>
<span>      "date": {</span>
<span>        "past_week": {}</span>
<span>      }</span>
<span>},</span>
<span>    "sorts": [{ "timestamp": "created_time", "direction": "descending" }]</span>
<span>}'</span>
</p>
```

## [](https://developers.notion.com/docs/working-with-databases#conclusion)

Understanding data source schemas, made from a collection of properties, is key to working with Notion databases. This enables you to add, query for, and manage pages to a data source.

You're ready to help users take advantage of Notion's flexible and extensible data source interface to work with more kinds of data. There's more to learn and do with data sources in the resources below.

### [](https://developers.notion.com/docs/working-with-databases#next-steps)

- This guide explains working with page properties. Take a look at [working with page content](https://developers.notion.com/docs/working-with-page-content).
- Explore the [database object](https://developers.notion.com/reference/database) and [data source object](https://developers.notion.com/reference/data-source) to see their other attributes available in the API.
- Learn about the other [page property value](https://developers.notion.com/reference/property-value-object) types. In particular, try to do more with [rich text](https://developers.notion.com/reference/rich-text).
- Learn more about [pagination](https://developers.notion.com/reference/intro#pagination).

Updated 9 days ago

---

- [Table of Contents](https://developers.notion.com/docs/working-with-databases#)
- - [Overview](https://developers.notion.com/docs/working-with-databases#overview)
    - [Additional types of databases](https://developers.notion.com/docs/working-with-databases#additional-types-of-databases)
  - [Structure](https://developers.notion.com/docs/working-with-databases#structure)
    - [Data source properties](https://developers.notion.com/docs/working-with-databases#data-source-properties)
    - [Iterate over a data source object](https://developers.notion.com/docs/working-with-databases#iterate-over-a-data-source-object)
  - [Adding pages to a data source](https://developers.notion.com/docs/working-with-databases#adding-pages-to-a-data-source)
  - [Finding pages in a data source](https://developers.notion.com/docs/working-with-databases#finding-pages-in-a-data-source)
    - [Filtering data source pages](https://developers.notion.com/docs/working-with-databases#filtering-data-source-pages)
    - [Sorting data source pages](https://developers.notion.com/docs/working-with-databases#sorting-data-source-pages)
  - [Conclusion](https://developers.notion.com/docs/working-with-databases#conclusion)
    - [Next steps](https://developers.notion.com/docs/working-with-databases#next-steps)
