package com.bitcero.keycloak.controller;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitcero.keycloak.dto.ResponseMessage;
import com.bitcero.keycloak.model.Foo;

@RestController
@RequestMapping("/foo")
@CrossOrigin
public class FooController {
  List<Foo> foos = Stream.of(
    new Foo(1, "foo 1"),
    new Foo(2, "foo 2"),
    new Foo(3, "foo 3")
    ).collect(Collectors.toList());

  @GetMapping("/list")
  public ResponseEntity<List<Foo>> list() {
    return new ResponseEntity<List<Foo>>(foos, null, HttpStatus.SC_OK);
  }

  @GetMapping("/detail/{id}")
  public ResponseEntity<Foo> detail(@PathVariable("id") int id) {
    Foo foo = foos.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
    return new ResponseEntity<Foo>(foo,null, HttpStatus.SC_OK);
  }

  @PostMapping("/create")
  public ResponseEntity<?> create(@RequestBody Foo foo) {
    int maxIndex = foos.stream().max(Comparator.comparing(m -> m.getId())).get().getId();
    foo.setId(maxIndex++);
    foos.add(foo);
    return new ResponseEntity<>(new ResponseMessage("created"), null, HttpStatus.SC_CREATED);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Foo foo) {
    Foo fooUpdate = foos.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
    fooUpdate.setName(foo.getName());
    foos.add(fooUpdate);
    return new ResponseEntity<>(new ResponseMessage("updated"), null, HttpStatus.SC_OK);
  }

  @DeleteMapping("/detail/{id}")
  public ResponseEntity<?> delete(@PathVariable("id") int id) {
    Foo foo = foos.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
    foos.remove(foo);
    return new ResponseEntity<>(new ResponseMessage("deleted"), null, HttpStatus.SC_OK);
  }
}
