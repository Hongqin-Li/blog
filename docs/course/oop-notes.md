+++
tags = ["notes", "cpp"]
+++

# OOP Notes

考试题型：

- 选择题：
  - 操作符重载（Overload）、函数覆盖（Override）、函数隐藏（Hiding）
- 填空题，填3行代码s
  - 注意初始化
- 看代码写输出
- 编程题，两道大题
  - 重载：操作符（二元/一元）、输入输出，二元操作建议定义在类外，如需访问私有成员，则在类内定义为friend
    ```c++
    class T {
    public:
      friend T operator+(const T&lhs, const T& rhs)) const;
      friend istream& operator>>(istream &is, const T& xx);
    }
    ```
  - C++文件操作，split的实现
  - 尽可能地用const修饰
  - 资源类需要移动赋值操作符号、移动构造函数、拷贝赋值操作符、拷贝构造函数
  - `#ifdef`，`#include`相关头文件，`using namespace std;`
  - stl中vector, list的使用


## 基础

形式参数（形参）：定义函数时函数名后括号中的变量名
实际参数（实参）：调用函数时函数名后括号中的表达式



### 静态局部变量

C++中的静态局部变量

- 内存分配在编译完成（同C）
- 初次执行时会调用构造函数（初始化），之后不再调用（通过某个bit来判断是否是第一次），故若函数未被执行，则不会初始化
- main之后会调用析构函数



### 引用

引用/指针和常引用/指针的区别和写法

```c++
#include <iostream>
#include <cassert>
using namespace std;

int main() {
  int a = 1, b = 1;

  // error: 'r' declared as reference but not initialized 
  // int& r;

  // error: cannot bind non-const lvalue reference of type 
  // 'int&' to an rvalue of type 'int'
  // int& r = 1;
  
  int& lr = a;
  int&& rr = 1 + 1, rr2 = 1+1;
  rr += 1;
  assert(&rr != &lr && rr != lr);

  // Reference to constant
  const int& lrk = lr;
  // error: assignment of read-only reference 'lrk'
  // lrk += 1;
  
  // Reference cannot be const
  // error: 'const' qualifiers cannot be applied to 'int&'
  // int & const klr = lr;
  
  // Constant pointer
  int * const kptr = &a;
  // error: assignment of read-only variable 'kptr'
  // kptr = &b; 
  
  // Pointer to const
  const int *ptrk = &a;
  ptrk = &b;
  // error: assignment of read-only location '* ptrk'
  // *ptrk = 1;

  return 0;
}
```



## STL

### 字符串处理

字符串转换到double或int：`double atof (const char* str);` 和 `int atoi (const char * str);`

子串：`string string::substr(iterator, len)`



### 算法

TODO

sort(a.begin(), a.end())

upperbound

lowerbound



### 输入输出和文件

[打开文件](http://www.cplusplus.com/reference/fstream/fstream/open/)：读（in）、写（out）、二进制模式（binary）、指针移至文件尾（ate）、追加写（app）、从头写（trunc）

内容读取：读取一行（`stream& getline(char* s [, streamsize n [, char delim]]);`）、读取一个字符（get）、撤回读取字符（unget）

例子

```c++
#include <fstream>
#include <cstring>
#include <iostream>

using namespace std;

string getline(istream &is) {
  char c;
  string line;
  do {
    c = is.get();
    if (c != EOF) line.push_back(c);
  } while (c != '\n' && c != EOF);
  return line;
}

int getint(istream &is) {
  char c;
  while ((c = is.get()) != EOF && (c == ' ' || c == '\n')) ;
  int x = 0;
  for (; '0' <= c && c <= '9'; c = is.get()) {
    x *= 10;
    x += c-'0';
  }
  if (c != EOF) is.unget();
  return x;
}

int main() {
  fstream fs;
  fs.open("tmp", fstream::in);
  if (!fs) cerr << "Can't open input file!";
  cout << getint(fs) << endl;
  for (string line = getline(fs); line.size() > 0; line = getline(fs)) {
    cout << line;
  }
  fs.close();
  return 0;
}
```



## 类

- 默认构造函数：没有参数的构造函数，默认生成
- 拷贝构造函数（[Copy constructors]()）
- 拷贝赋值操作符（[Copy assignment operator](https://en.cppreference.com/w/cpp/language/copy_assignment)）
- 移动构造函数（[Move constructors](https://en.cppreference.com/w/cpp/language/move_constructor)）
- 移动赋值操作符号（[Move assignment operator]()）

一个简单的例子如下

```c++
class T {
 public:
  T(); // Default constructor
  T(T& rhs); // Copy constructor
  T(T&& rhs); // Move constructor
  T& operator=(T& rhs); // Copy assignment operator
  T& operator=(T&& rhs); // Move assignment operator
  ~T();
};
```



### 拷贝构造函数

定义：构造函数的一种，第一个参数为`T&‍`, `const T&‍`, `volatile T&‍`, or `const volatile T&‍` 中的一个，且没有其他参数或其他参数均有默认值

何时调用：初始化（`T t1 = t2`或`T t1(t2)`）、函数传参（`void f(T t)`）、函数返回（`return t;`）

### 移动构造函数

定义：构造函数的一种，第一个参数为`T&&‍`, `const T&&‍`, `volatile T&‍&`, or `const volatile T&&‍` 中的一个，且没有其他参数或其他参数均有默认值

调用时机：初始化（`T t1 = std::move(t2);` 或 `T t1(std::move(t2));`）、函数传参（`f(std::move(t));`，其中f声明为`void f(T);`）、函数返回（`return std::move(t);`）

### 拷贝赋值操作符

定义：重载=的一种，第一个参数为`T`, `T&‍`, `const T&‍`, `volatile T&‍`, or `const volatile T&‍` 中的一个，且没有其他参数或其他参数均有默认值

注意到只有当参数为`T`，才可用swap的方法来实现拷贝赋值，否则不行，因为是常引用

### 移动赋值操作符

定义：重载=的一种，参数同移动构造函数

功能是直接将对象的资源“偷来”转移到被赋值的对象上（原对象的资源会成为未定义状态或空）





### 成员函数和非成员函数

非成员函数就是普通函数（c风格）

成员函数是面向对象的那种，只能在类里面声明

成员函数最后的 const 是用来修饰this指针的



### explicit

https://stackoverflow.com/questions/121162/what-does-the-explicit-keyword-mean

`Str a = b;`

用explicit后需要改成 `Str a{b};`，但返回值永远不行



### 左值、右值和引用

https://zh4ui.net/post/2018-08-07-cplusplus-return-value-or-reference/

不能放在等号左边的是右值

能放在等号左边的是左值



### default/delete

default: 自定义了带参数的构造函数后，编译器是不会再自动提供默认的无参版本了，若需则用default

delete: 例如禁止使用拷贝构造函数，显示指示编译器不生成函数的默认版本，此后重载该函数非法



```c++
class MyClass
{
  public:
    MyClass() = default;
    MyClass(int i): data(i) {}
    MyClass(const MyClass &) = delete;
  private:
    int data;
}
```





### 函数重载

同名是指函数名字相同，同参是指参数列表相同（参数中const xxx和xxx相同）

函数的签名：由函数名和参数列表构成，用`objdump -x`查看其SYMBOL TABLE，编译时不允许有同签名（即同名同参）的函数

函数重载：当函数同名不同签名的时候发生

引用/常引用，指针/指向常的指针，是不同签名；而值是否为const都是同一签名



```c++
#include <iostream>

int f(int x) { return 0; }

// These two are allowed
void f(int *p) { }
void f(const int *p) { }

// error: ambiguating new declaration of 'void f(int)'
// void f(int x) {}

// Since const xxx and xxx is same when pass by value
// In fact, void f(const int x) will be same as void f(int)
// error: redefinition of 'int f(int)'
// void f(const int x) { }

// error: redefinition of 'void f(int*)'
// void f(int * const p) { }

int main() {
  return 0;
}
```



### 操作符重载

- 全局operator new/delete[]可以重载，可以用来检测内存情况
- 类本身的operator new/delete



二元操作符推荐写成非成员

各种重载的推荐写法（其中类型其实支持自定义，但通常这么写）

```c++
// T.h
using namespace std;
class T {
 public:
  bool operator==(const T& lhs, const T& rhs);

  
  // a++/++a
  const T operator++(int);// Return const T to avoid a++ = b
  T& operator++();

  // Binary operations
  // Return const T to avoid a + b = c
  friend const T operator+(const T& lhs, const T& rhs);
  
  // IO
  friend istream& operator>>(istream &is, T& rhs);
  friend ostream& operator<<(ostream &os, const T& lhs);
};
// T.cc
```







## 继承和多态

继承的种类：单继承（`Derived: Base`）、多继承（`Derived: Base1, Base2`）、多级继承（`DDerived: Derived: Base`）、混合继承（`DDerived: (Derived1, Derived2): Base`）

多态的实现原理：理解vtable，vptr，vtable每个类只有一张，在编译时就固定在内存中



编译器会在构造函数中的最后插入初始化vptr的代码，故在构造函数中调用虚函数是不生效的

构造时先调用基类构造函数（可以在初始化列表上指定调用哪种，否则调用默认构造函数），析构时后后调用基类析构函数，故**基类析构函数一定要设置成virtual**

派生类的大小=基类大小+派生类成员大小+4B（vptr大小）



参考资料：

1. [the virtual table](https://www.learncpp.com/cpp-tutorial/125-the-virtual-table/)
2. [继承的内存布局](https://stackoverflow.com/questions/1321062/object-layout-in-case-of-virtual-functions-and-multiple-inheritance)
3. [多继承的内存布局](https://cs.nyu.edu/courses/fall16/CSCI-UA.0470-001/slides/MemoryLayoutMultipleInheritance.pdf)



### 访问控制

对派生类内部来说

| 基类      | public继承 | protected继承 | private继承 |
| --------- | ---------- | ------------- | ----------- |
| private   | 不可见     | 不可见        | 不可见      |
| protected | protected  | protected     | **private** |
| public    | public     | protected     | **private** |



对外部对象来说（即包括`A a; a.f();`）

| 基类      | public继承 | protected继承 | private继承 |
| --------- | ---------- | ------------- | ----------- |
| private   | 不可见     | 不可见        | 不可见      |
| protected | 不可见     | 不可见        | 不可见      |
| public    | **可见**   | 不可见        | 不可见      |



测试例子如下

```c++
#include <iostream>
using namespace std;

class Base {
public:
  void bpublic() { cout << "Base public" << endl;}
protected:
  void bprotected() { cout << "Base protected" << endl;}
private:
  void bprivate() { cout << "Base private" << endl;}
};
class DerivedPublic: public Base {
public:
  void test() { bpublic(); bprotected(); // bprivate();
  }
};
class DerivedProtected: protected Base {
public:
  void test() { bpublic(); bprotected(); // bprivate();
  }
};
class DerivedPrivate: private Base {
public:
  void test() { bpublic(); bprotected(); // bprivate();
  }
};

int main() {
  DerivedPublic d1; DerivedProtected d2; DerivedPrivate d3;
  d1.test(); d2.test(); d3.test();
  d1.bpublic(); // d1.bprotected(); d1.bprivate();
  // d2.bpublic(); d2.bprotected(); d2.bprivate();
  // d3.bpublic(); d3.bprotected(); d3.bprivate();
  return 0;
}
```



### 静态绑定和动态绑定

静态绑定：以非指针非引用来调用某个函数是可以在编译时确定是哪个函数

动态绑定：以指针/引用来调用某个函数需要在运行时才能知道调用的是哪个函数



### 混合继承

混合继承时，父类的共同父类会被重复多次，因为每个父类中都会有一份

```c++
#include <iostream>
#include <cassert>

using namespace std;

class Base {
 public:
  int b;
};

class Mid1: public Base {
 public:
  int m1;
};

class Mid2: public Base {
 public:
  long long m2;
};

class Derived: public Mid1, public Mid2 {
 public:
  int d;
};

int main() {
  Derived d;
  Mid1 *pm1 = &d;
  Mid2 *pm2 = &d;

  /* The memory layout of Derived
   * [Mid1, Mid2, d] = [Mid1.Base::b, m1, Mid2.Base::b, m2, d]
   * Thus, when casting a Derived pointer to Mid2, a shift 
   * occurs that it then points to Mid2 in the Derived
   */

  // 32 8 16
  cout << sizeof(d) << ' ' << sizeof(*pm1) << ' ' << sizeof(*pm2);

  assert(pm1 == &d && pm2 == (void *)&d + sizeof(*pm1));

  // The following line causes error: 
  // 'Base' is an ambiguous base of 'Derived'
  // Base *pb = &d;

  return 0;
}
```



### 切片

对象按指针/引用传递时，不会发生切片，而对象按值传递时，会发生切片，如

```c++
class Derived: public Base {...};
void describe(Base b);
describe(derived) is the same as describe((Base)derived)
```



### 函数覆盖

函数覆盖（[Override](https://en.cppreference.com/w/cpp/language/override)）的定义是一个派生类virtual函数覆盖另外基类的virtual同名同参函数，给成员函数修饰override后，编译器会验证其是虚函数且必覆盖掉了基类的某个虚函数，否则报错。

虚函数建议放在private下

一旦派生类中某个函数同基类某个virtual函数同签名，则会自动变成virtual，并产生函数覆盖，若返回类型不同，则报错



### 函数隐藏

函数覆盖：覆盖virtual

函数隐藏：派生类若定义了和基类同名函数（仅函数名相同即可，不含返回值/const），则不能直接调用基类的此函数，但仍可用`Base::f`调用

同名即隐藏（除非都是virtual）

```c++
#include <iostream>

using namespace std;

class Base {
 public:
  void f() { cout << "Base::f" << endl; };
  virtual void vf() { cout << "Base::vf" << endl; }
};
class Derived0: public Base {
};
class Derived1: public Base {
 public:
  void f() { cout << "Derived1::f" << endl; }
  void vf() { cout << "Derived1::vf" << endl; }
};
class Derived2: public Base {
 public:
  int f() { cout << "Derived2::f" << endl; return 0; }
  void vf(int) { cout << "Derived2::vf" << endl; }
  // error: conflicting return type specified for 'virtual int Derived2::vf()'
  // int vf() {}
  void vf() override { cout << "Derived2::vf" << endl; }
};
class Derived3: public Base {
 public:
  void f(int) { cout << "Derived3::f" << endl; }
};
class Derived4: public Base {
 public:
  void f() const { cout << "Derived4::f" << endl; }
};

int main() {
  Derived0 d0;
  Derived1 d1;
  Derived2 d2;
  Derived3 d3;
  Derived4 d4;

  // All call f of derived class
  d1.f();
  d2.f();
  d3.f(0);
  d4.f();

  // d0/d1 should be public derived from Base or Base::f is inaccessible
  d0.f(); 
  d1.Base::f();

  d0.vf();
  d1.vf();
  d2.vf(0);
  d2.vf();

  return 0;
}
```



### 单例模式

构造析构放private，拷贝移动构造和赋值delete

```c++
static Singleton& Singleton::getInstance()
{
    static Singleton instance;
    return instance;
}
```

采用c++11及以上版本编译，可以支持线程安全，lazy-initialize，自动销毁.
