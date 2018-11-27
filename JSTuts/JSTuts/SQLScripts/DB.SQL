use master  
 go
  

declare @DatabaseName  nvarchar(50) 

     set @DatabaseName = N'ADONET' 
 

 declare @sql varchar(max) 
   select @Sql = coalesce(@SQL, '') + 'Kill ' + Convert(varchar, spid) + ';'
   from master..SysProcesses 
  Where  DBId = DB_ID(@DatabaseName) 
       AND SPId <> @@SPid


    select @sql
    exec  @sql 

    go 
 
 if exists(
    select  name
    from sys.databases
    where name = 'ADONET'
    )
    drop database ADONET
    go 

    create database ADONET
    go

    use ADONET
 
 go 
 if not exists (select  *  from sysobjects where id = OBJECT_ID(N'[dbo].[Avdelningar]') and OBJECTPROPERTY(id, N'IsUserTable') = 1) 
       create table dbo.Employee 
       (
         EmployeeID  int Identity not null, 
         Name nvarchar (50),
         Age int, 
         [State] nvarchar(50),
         Country nvarchar (50),
         CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED (EmployeeID)
       
       )
go


if exists(select name from sysobjects where name = 'Selectemployee' and type='p')
  begin   
    drop procedure Selectemployee  
  end
    
set  ansi_nulls on 
  go 

set quoted_identifier on 
  go 

create procedure Selectemployee
     as  
     begin 
      select * from  Employee; 
    end
go
--------------------------------------------------------------------------------------------------------
if exists(select name from sysobjects where name = 'Insertupdateemployee' and type='p')
   begin
     drop procedure Insertupdateemployee
   end
set ansi_nulls on  
 go 
 
 set quoted_identifier on 
  go 

create procedure Insertupdateemployee (
  @Id integer, 
  @Name nvarchar,
  @Age integer, 
  @State nvarchar(50),
   @Country nvarchar(50),
  @Action varchar(10) 

)
as 
 Begin 
    IF @Action = 'Insert' 
       Begin 
          insert into Employee (Name, Age, [State], Country)
          Values(@Name, @Age,@State ,@Country); 
          end


if @Action = 'Update' 
    Begin  
      Update Employee 
      set Name = @Name, 
          Age  =  @Age,
          [State] = @State ,
          Country = @Country 

Where EmployeeID  =  @Id;  
  end 
  
  end 
   
           

go 

------------------------------------------------------------------------------------------------------------
 
if exists(select name from sysobjects where name = 'DeleteEmployee' and type='p')
   begin 
      drop procedure DeleteEmployee  
   end  
   go 
    set ansi_nulls on 
	  go 
	     set  quoted_identifier  on  
	  go 
	  
 create procedure  DeleteEmployee (@Id integer) 
        as 
		 Begin  
		    Delete Employee 
 			Where   EmployeeID =  @Id; 
    end  
 

  
 

	  
	  

    
    
  